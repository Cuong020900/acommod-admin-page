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
    Edit,
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

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const statusOptions = [
    { value: 1, label: "Chờ xử lý" },
    { value: 2, label: "Không được duyệt" },
    { value: 3, label: "Đã duyệt" },
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
                field: "postId",
                width: 150,
                filter: true,
                checkboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                headerCheckboxSelection: true
            },
            {
                headerName: "Chủ trọ",
                field: "author",
                filter: true,
                width: 250,
                cellRendererFramework: params => {
                    return (
                        <div
                            className="d-flex align-items-center cursor-pointer"
                        >
                            <img
                                className="rounded-circle mr-50"
                                src={avatarImg}
                                alt="user avatar"
                                height="30"
                                width="30"
                            />
                            <span>{(params.data.userName ?? " ") + "-" + params.data.fullNameOwner}</span>
                        </div>
                    )
                }
            },
            {
                headerName: "Thành phố",
                field: "city",
                width: 150,
                filter: true
            },
            {
                headerName: "Đã được thuê",
                field: "hired",
                width: 250,
                filter: true
            },
            {
                headerName: "Star",
                field: "star",
                filter: true,
                width: 150,
                cellRendererFramework: params => {
                    let min = 4.0,
                    max = 5.0,
                    star = Math.random() * (max - min) + min
                    star = Number(star.toFixed(1))
                    return (<div>{star + " "}<Star size={20} className="text-warning" /></div>)
                }
            },
            {
                headerName: "Số lượt xem bài",
                field: "totalView",
                filter: true,
                width: 150,
                cellRendererFramework: params => {
                    return(<div>{params.value + " views"}</div>)
                }
            },
            {
                headerName: "Số lượt thích",
                field: "totalLike",
                filter: true,
                width: 150,
                cellRendererFramework: params => {
                    return(<div>{params.value + " likes"}</div>)
                }
            },
            {
                headerName: "Trạng thái",
                field: "postStatus",
                filter: true,
                width: 250,
                cellRendererFramework: params => {
                    return +params.value === 1 ? (
                        <div className="badge badge-pill badge-light-warning">
                            {"Chờ xử lý"}
                        </div>
                    ) : +params.value === 2 ? (
                        <div className="badge badge-pill badge-light-danger">
                            {"Không được duyệt"}
                        </div>
                    ) : +params.value === 3 ? (
                        <div className="badge badge-pill badge-light-success">
                            {"Đã duyệt"}
                        </div>
                    ) : null
                }
            },
            {
                headerName: "Actions",
                field: "transactions",
                width: 150,
                cellRendererFramework: params => {
                    return (
                        <div className="actions cursor-pointer">
                            <Edit
                                className="mr-2"
                                size={20}
                                color="green"
                                onClick={() => {
                                    this.openModal(params.data)
                                }}
                            />
                            <Trash2
                                className="mr-50"
                                size={20}
                                color="red"
                                onClick={async () => {
                                    await axios.delete("https://localhost:5000/api/Post/delete?postId=" + params.data.postId, { 
                                        data: {postId: params.data.postId},
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

    componentDidMount() {
        this.getData()
    }

    async getData () {
        await axios.get("https://localhost:5000/api/Post/getallformod", { 
            withCredentials: true
        }).then(response => {
            let rowData = response.data
            this.setState({ rowData })
        })
    }

    notifyWarning = () => toast.warning("Lỗi!")

    notifySuccess = () => toast.success("Success!")

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

    changePostStatus = async () => {

        // gui request change status
        let path = `https://localhost:5000/api/Post/changestatus?postId=${this.state.itemSelected?.postId}&postStatusEnum=${this.state.postChanged?.status}`
        let res = await axios.put(path,{postId: this.state.itemSelected?.postId, postStatusEnum: this.state.postChanged?.status}, {
            withCredentials: true
        })

        if (res.status === 200) {
            await axios.get("https://localhost:5000/api/Post/getallformod", { 
                withCredentials: true
            }).then(response => {
                let rowData = response.data
                this.setState({ rowData })
            })
            this.notifySuccess()
        } else {
            this.notifyWarning()
        }

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
                status: item.postStatus
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
                <ToastContainer />

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggleModal}
                    className="modal-dialog-centered modal-lg"
                >
                    <ModalHeader toggle={this.toggleModal} className="bg-primary">
                        Chỉnh sửa bài viết
                    </ModalHeader>
                    <ModalBody className="modal-dialog-centered">
                        
                    
                    </ModalBody>
                    <ModalBody className="modal-dialog-centered">
                        <Card className="w-100">
                            <CardBody>
                            <h5 className="mb-1">Link bài viết:</h5>
                            <a href={"https://easy-accomod.netlify.app/product-detail/" + this.state.itemSelected?.postId} target="_blank" className="mb-1">{"Link tới bài viết"}</a>
                            <hr />
                            <Row>
                                <Col md="6" sm="12">
                                    <h5 className="mb-1">Trạng thái</h5>
                                    <Select
                                        className="React"
                                        classNamePrefix="select"
                                        defaultValue={function a(){
                                            let status = statusOptions.filter(e => e.value===this.state.itemSelected?.postStatus)
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
                            <hr />
                            <h5 className="mb-1">Số lượt xem:</h5>
                            <p> { this.state.itemSelected?.totalView ?? '0' } lượt xem </p>
                            <hr />
                            <h5 className="mb-1">Số lượt thích:</h5>
                            <p> { this.state.itemSelected?.totalLike ?? '0' } lượt thích </p>
                            </CardBody>
                        </Card>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.changePostStatus}>
                            Lưu
                        </Button>{" "}
                    </ModalFooter>
                </Modal>
                <Col sm="12">
                    <Card
                        className={classnames("card-action card-reload", {
                            "d-none": this.state.isVisible === false,
                            "card-collapsed": this.state.status === "Closed",
                            closing: this.state.status === "Closing...",
                            opening: this.state.status === "Opening...",
                            refreshing: this.state.reload
                        })}
                    >
                        <CardHeader>
                            <CardTitle>Filters</CardTitle>
                            <div className="actions">
                                <ChevronDown
                                    className="collapse-icon mr-50"
                                    size={15}
                                    onClick={this.toggleCollapse}
                                />
                                <RotateCw
                                    className="mr-50"
                                    size={15}
                                    onClick={() => {
                                        this.refreshCard()
                                        this.gridApi.setFilterModel(null)
                                    }}
                                />
                                <X size={15} onClick={this.removeCard} />
                            </div>
                        </CardHeader>
                        <Collapse
                            isOpen={this.state.collapse}
                            onExited={this.onExited}
                            onEntered={this.onEntered}
                            onExiting={this.onExiting}
                            onEntering={this.onEntering}
                        >
                            <CardBody>
                                {this.state.reload ? (
                                    <Spinner color="primary" className="reload-spinner" />
                                ) : (
                                        ""
                                    )}
                                <Row>
                                    <Col lg="3" md="6" sm="12">
                                        <FormGroup className="mb-0">
                                            <Label for="status">Status</Label>
                                            <Input
                                                type="select"
                                                name="status"
                                                id="status"
                                                value={this.state.selectStatus}
                                                onChange={e => {
                                                    this.setState(
                                                        {
                                                            selectStatus: e.target.value
                                                        },
                                                        () =>
                                                            this.filterData(
                                                                "postStatus",
                                                                this.state.selectStatus.toLowerCase()
                                                            )
                                                    )
                                                }}
                                            >
                                                <option value="All">All</option>
                                                <option value={1}>Chờ xử lý</option>
                                                <option value={2}>Không được duyệt</option>
                                                <option value={3}>Đã duyệt</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    </Row>
                            </CardBody>
                        </Collapse>
                    </Card>
                </Col>
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
