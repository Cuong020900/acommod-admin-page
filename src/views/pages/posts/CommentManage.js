import React from "react"
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    UncontrolledDropdown,
    UncontrolledButtonDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Collapse,
    Spinner,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from "reactstrap"
import Select from "react-select"
import { Star } from "react-feather"
import axios from "axios"
import { ContextLayout } from "../../../utility/context/Layout"
import { AgGridReact } from "ag-grid-react"
import {
    Check,
    Trash2,
    ChevronDown,
    Clipboard,
    Printer,
    Download,
    RotateCw,
    X
} from "react-feather"
import classnames from "classnames"
import { history } from "../../../history"
import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss"
import "../../../assets/scss/pages/users.scss"
import avatarImg from "../../../assets/img/portrait/small/avatar-s-3.jpg"

const statusOptions = [
    { value: "actived", label: "actived" },
    { value: "pending", label: "pending" },
    { value: "deleted", label: "deleted" },
]
class UsersList extends React.Component {
    state = {
        postChanged: {
            id: null,
            userId: null,
            status: null
        },
        itemSelected: null,
        modal: false,
        rowData: null,
        pageSize: 10,
        isVisible: true,
        reload: false,
        collapse: true,
        status: "Opened",
        role: "All",
        selectStatus: "All",
        verified: "All",
        department: "All",
        defaultColDef: {
            sortable: true
        },
        searchVal: "",
        columnDefs: [
            {
                headerName: "ID",
                field: "commentId",
                width: 150,
                filter: true,
                checkboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                headerCheckboxSelection: true
            },
            {
                headerName: "Post Id",
                field: "postId",
                width: 150,
                filter: true
            },
            {
                headerName: "Title",
                field: "title",
                filter: true,
                width: 350
            },
            {
                headerName: "Nội dung",
                field: "reviewContent",
                filter: true,
                width: 650,
                height: 200
            },
            {
                headerName: "Star",
                field: "star",
                filter: true,
                width: 150,
                cellRendererFramework: params => {
                    return (<div>{params.data.star + " "}<Star size={20} className="text-warning" /></div>)
                }
            },
            {
                headerName: "Actions",
                field: "transactions",
                width: 150,
                cellRendererFramework: params => {
                    return (
                        <div className="actions cursor-pointer">
                            <Check
                                className="mr-2"
                                size={20}
                                color="green"
                                onClick={async () => {
                                    // gui request xac nhan duyet
                                    await axios.post("https://localhost:5000/api/Comment/confirm?cmtId=" + params.data.commentId, {
                                        data: {cmtId: params.data.commentId},
                                    }, {
                                        withCredentials: true
                                    })
                                    this.getData()
                                }}
                            />
                            <Trash2
                                className="mr-50"
                                size={20}
                                color="red"
                                onClick={async () => {
                                    await axios.delete("https://localhost:5000/api/Comment/delete?cmtId=" + params.data.commentId, { 
                                        data: {cmtId: params.data.commentId},
                                        withCredentials: true
                                    })
                                    this.getData()
                                }}
                            />
                        </div>
                    )
                }
            }
        ]
    }

    async componentDidMount() {
        this.getData()
    }
    async getData () {
        await axios.get("https://localhost:5000/api/Comment/getconfirm", { withCredentials: true }).then(response => {
            let rowData = response.data
            this.setState({ rowData })
        })
    }

    resetPostChanged = () => {
        this.setState(prevState => ({ 
            postChanged: {
                id: null,
                userId: null,
                status: null
            }
        }))
    }

    onGridReady = params => {
        this.gridApi = params.api
        this.gridColumnApi = params.columnApi
    }

    filterData = (column, val) => {
        var filter = this.gridApi.getFilterInstance(column)
        var modelObj = null
        if (val !== "all") {
            modelObj = {
                type: "equals",
                filter: val
            }
        }
        filter.setModel(modelObj)
        this.gridApi.onFilterChanged()
    }

    filterSize = val => {
        if (this.gridApi) {
            this.gridApi.paginationSetPageSize(Number(val))
            this.setState({
                pageSize: val
            })
        }
    }
    updateSearchQuery = val => {
        this.gridApi.setQuickFilter(val)
        this.setState({
            searchVal: val
        })
    }

    refreshCard = () => {
        this.setState({ reload: true })
        setTimeout(() => {
            this.setState({
                reload: false,
                role: "All",
                selectStatus: "All",
                verified: "All",
                department: "All"
            })
        }, 500)
    }

    toggleCollapse = () => {
        this.setState(state => ({ collapse: !state.collapse }))
    }

    changePostStatus = (item) => {

        // gui request change status

        // reset form
        this.resetPostChanged()
        this.setState(prevState => ({
            itemSelected: null,
            modal: false
        }))
    }
    openModal = (item) => {
        this.setState(prevState => ({
            itemSelected: item,
            modal: true,
            postChanged: {
                id: item?.id ?? null,
                userId: item?.user_id ?? null,
                status: item.status
            }
        }))
    }
    closeModal = (item) => {
        this.setState(prevState => ({
            modal: false
        }))
    }
    onEntered = () => {
        this.setState({ status: "Opened" })
    }
    onEntering = () => {
        this.setState({ status: "Opening..." })
    }

    onEntered = () => {
        this.setState({ status: "Opened" })
    }
    onExiting = () => {
        this.setState({ status: "Closing..." })
    }
    onExited = () => {
        this.setState({ status: "Closed" })
    }
    removeCard = () => {
        this.setState({ isVisible: false })
    }

    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    render() {
        const { rowData, columnDefs, defaultColDef, pageSize } = this.state
        return (
            <Row className="app-user-list">
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggleModal}
                    className="modal-dialog-centered modal-lg"
                >
                    <ModalHeader toggle={this.toggleModal} className="bg-primary">
                        Chỉnh sửa bài viết
                    </ModalHeader>
                    <ModalBody className="modal-dialog-centered">
                        <Card className="w-100">
                            <CardBody>
                            <h5 className="mb-1">Link bài viết:</h5>
                            <a href={this.state.itemSelected?.link ?? '#'} target="_blank" className="mb-1">{ this.state.itemSelected?.title ?? "Không tìm thấy link"}</a>
                            <hr />
                            <Row>
                                <Col md="6" sm="12">
                                    <h5 className="mb-1">Trạng thái</h5>
                                    <Select
                                        className="React"
                                        classNamePrefix="select"
                                        defaultValue={function a(){
                                            let status = statusOptions.filter(e => e.value===this.state.itemSelected?.status)
                                            return status[0]
                                        }.bind(this)()}
                                        name="color"
                                        options={statusOptions}
                                        onChange={e => {
                                            this.setState(prevState => ({ 
                                                postChanged: {
                                                    status: e.value
                                                }
                                            }))
                                        }}
                                    />
                                </Col>
                            </Row>
                            <hr />
                            <h5 className="mb-1">Star:</h5>
                            <p> { this.state.itemSelected?.star ?? '0' } <Star size={20} className="text-warning" /> </p>
                            <hr />
                            <h5 className="mb-1">Số lượt xem:</h5>
                            <p> { this.state.itemSelected?.numberOfViews ?? '0' } lượt xem </p>
                            <hr />
                            <h5 className="mb-1">Số lượt thích:</h5>
                            <p> { this.state.itemSelected?.numberOfLikes ?? '0' } lượt thích </p>
                            </CardBody>
                        </Card>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.changePostStatus}>
                            Accept
                        </Button>{" "}
                    </ModalFooter>
                </Modal>
                <Col sm="12">
                    <Card>
                        <CardBody>
                            <div className="ag-theme-material ag-grid-table">
                                <div className="ag-grid-actions d-flex justify-content-between flex-wrap mb-1">
                                    <div className="sort-dropdown">
                                        <UncontrolledDropdown className="ag-dropdown p-1">
                                            <DropdownToggle tag="div">
                                            1 - {pageSize} of { this.state?.rowData?.length }
                        <ChevronDown className="ml-50" size={15} />
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                            <DropdownItem
                                                    tag="div"
                                                    onClick={() => this.filterSize(5)}
                                                >
                                                    5
                        </DropdownItem>
                        <DropdownItem
                                                    tag="div"
                                                    onClick={() => this.filterSize(10)}
                                                >
                                                    10
                        </DropdownItem>
                                                <DropdownItem
                                                    tag="div"
                                                    onClick={() => this.filterSize(20)}
                                                >
                                                    20
                        </DropdownItem>
                                                <DropdownItem
                                                    tag="div"
                                                    onClick={() => this.filterSize(50)}
                                                >
                                                    50
                        </DropdownItem>
                                                <DropdownItem
                                                    tag="div"
                                                    onClick={() => this.filterSize(100)}
                                                >
                                                    100
                        </DropdownItem>
                                                <DropdownItem
                                                    tag="div"
                                                    onClick={() => this.filterSize(150)}
                                                >
                                                    150
                        </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                    <div className="filter-actions d-flex">
                                        <Input
                                            className="w-50 mr-1 mb-1 mb-sm-0"
                                            type="text"
                                            placeholder="search..."
                                            onChange={e => this.updateSearchQuery(e.target.value)}
                                            value={this.state.searchVal}
                                        />
                                        <div className="dropdown actions-dropdown">
                                            <UncontrolledButtonDropdown>
                                                <DropdownToggle className="px-2 py-75" color="white">
                                                    Actions
                                                    <ChevronDown className="ml-50" size={15} />
                                                </DropdownToggle>
                                                <DropdownMenu right>
                                                    <DropdownItem tag="a">
                                                        <Trash2 size={15} />
                                                        <span className="align-middle ml-50">Delete</span>
                                                    </DropdownItem>
                                                    <DropdownItem tag="a">
                                                        <Clipboard size={15} />
                                                        <span className="align-middle ml-50">Archive</span>
                                                    </DropdownItem>
                                                    <DropdownItem tag="a">
                                                        <Printer size={15} />
                                                        <span className="align-middle ml-50">Print</span>
                                                    </DropdownItem>
                                                    <DropdownItem tag="a">
                                                        <Download size={15} />
                                                        <span className="align-middle ml-50">CSV</span>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledButtonDropdown>
                                        </div>
                                    </div>
                                </div>
                                {/* bang du lieu  */}
                                {this.state.rowData !== null ? (
                                    <ContextLayout.Consumer>
                                        {context => (
                                            <AgGridReact
                                                gridOptions={{}}
                                                rowSelection="multiple"
                                                defaultColDef={defaultColDef}
                                                columnDefs={columnDefs}
                                                rowData={rowData}
                                                onGridReady={this.onGridReady}
                                                colResizeDefault={"shift"}
                                                animateRows={true}
                                                floatingFilter={true}
                                                pagination={true}
                                                pivotPanelShow="always"
                                                paginationPageSize={pageSize}
                                                resizable={true}
                                                enableRtl={context.state.direction === "rtl"}
                                            />
                                        )}
                                    </ContextLayout.Consumer>
                                ) : null}
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default UsersList
