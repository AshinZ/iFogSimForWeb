  <template>
      <a-layout id="components-layout-demo-top-side" >
        <!-- 顶部导航栏 begin -->
        <a-layout-header class="header">
          <div class="logo" />
          <a-menu
            theme="dark"
            mode="horizontal"
            :default-selected-keys="['']"
            :style="{ lineHeight: '64px' }"
          >
            <a-menu-item key="2" >
              使用说明
            </a-menu-item>
          </a-menu>
        </a-layout-header>

        <!-- 顶部导航栏 end -->
        <!-- 主体部分 begin -->
        <a-layout-content style="padding: 10px 50px 10px;">
          <!-- 侧边导航栏 begin -->

          <a-layout style="padding: 24px 0; background: #fff">
            <a-layout-sider width="200" style="background: #fff">
              <a-menu
                mode="inline"
                :default-selected-keys="['']"
                :default-open-keys="['sub1']"
                style="height: 100%"
              >
                <a-sub-menu key="sub1">
                  <span slot="title"><a-icon type="snippets" />拓扑操作</span>
                  <a-menu-item key="1" @click="changeContentType('addFogDevice')"><a-icon type="cloud" />
                    添加设备
                  </a-menu-item>
                  <a-menu-item key="2" @click="changeContentType('addSensor')"><a-icon type="monitor" />
                    添加传感器
                  </a-menu-item>
                  <a-menu-item key="3" @click="changeContentType('addActuator')"><a-icon type="bulb" />
                    添加触发器
                  </a-menu-item>
                  <a-menu-item key="4" @click="changeContentType('addLink')"><a-icon type="api" />
                    添加连接
                  </a-menu-item>
                  <a-menu-item key="5" @click="changeContentType('topo')"><a-icon type="edit" />
                    查看数据
                  </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub2">
                  <span slot="title"><a-icon type="step-forward" theme="filled" />运行</span>
                  <a-menu-item key="6"  @click="iFogSimSimulation"><a-icon type="play-circle" />
                    模拟
                  </a-menu-item>
                  <a-menu-item key="7" @click="changeContentType('getResult')"><a-icon type="area-chart" />
                    查看结果
                  </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub3">
                  <span slot="title"><a-icon type="folder-open" />文件操作</span>
                  <a-menu-item key="8" @click="changeContentType('downloadTopo')"><a-icon type="cloud-download" />
                    保存拓扑
                  </a-menu-item>
                  <a-menu-item key="9" @click="changeContentType('uploadTopo')"><a-icon type="cloud-upload" />
                    载入拓扑
                  </a-menu-item>
                </a-sub-menu>
              </a-menu>
            </a-layout-sider>
            <!-- 侧边导航栏 end -->
            <!-- 正文内容 begin -->

            <a-layout-content :style="{ padding: '5px 24px', minHeight: '58px' }">
              <!-- 绘制模式 begin -->
              <template v-if = "contentType=='topo'">
                <div>
                  <a-tabs default-active-key="2" @change="callback">
               <!--     <a-tab-pane key="1" tab="拓扑结构">
                      <template>
                        <template>
                          <a-tree :tree-data="this.simulationData" show-icon default-expand-all :default-selected-keys="['0-0-0']">
                            <a-icon slot="switcherIcon" type="down" />
                            <a-icon slot="smile" type="smile-o" />
                            <a-icon slot="meh" type="smile-o" />
                            <template slot="custom" slot-scope="{ selected }">
                              <a-icon :type="selected ? 'frown' : 'frown-o'" />
                            </template>
                          </a-tree>
                        </template>
                      </template>
                    </a-tab-pane>-->


                    <a-tab-pane key="2" tab="FogDevice List" force-render>
                      <template>
                        <a-table  rowKey="columnId"  :data-source="simulationData.fogDeviceData" :columns="fogDeviceColumns">
                          <div
                            slot="filterDropdown"
                            slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                            style="padding: 8px"
                          >
                            <a-input
                              v-ant-ref="c => (searchInput = c)"
                              :placeholder="`Search ${column.dataIndex}`"
                              :value="selectedKeys[0]"
                              style="width: 188px; margin-bottom: 8px; display: block;"
                              @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                              @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                            />
                            <a-button
                              type="primary"
                              icon="search"
                              size="small"
                              style="width: 90px; margin-right: 8px"
                              @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                            >
                              Search
                            </a-button>
                            <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
                              Reset
                            </a-button>
                          </div>
                          <a-icon
                            slot="filterIcon"
                            slot-scope="filtered"
                            type="search"
                            :style="{ color: filtered ? '#108ee9' : undefined }"
                          />
                          <template slot="customRender" slot-scope="text, record, index, column">
                              <span v-if="searchText && searchedColumn === column.dataIndex">
                                <template
                                  v-for="(fragment, i) in text
                                    .toString()
                                    .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
                                >
                                  <mark
                                    v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                                    :key="i"
                                    class="highlight"
                                  >{{ fragment }}</mark
                                  >
                                  <template v-else>{{ fragment }}</template>
                                </template>
                              </span>
                            <template v-else>
                              {{ text }}
                            </template>
                          </template>
                        </a-table>
                      </template>
                    </a-tab-pane>


                    <a-tab-pane key="3" tab="Sensor List">
                      <template>
                        <a-table :data-source="simulationData.sensorData" :columns="sensorColumns">
                          <div
                            slot="filterDropdown"
                            slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                            style="padding: 8px"
                          >
                            <a-input
                              v-ant-ref="c => (searchInput = c)"
                              :placeholder="`Search ${column.dataIndex}`"
                              :value="selectedKeys[0]"
                              style="width: 188px; margin-bottom: 8px; display: block;"
                              @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                              @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                            />
                            <a-button
                              type="primary"
                              icon="search"
                              size="small"
                              style="width: 90px; margin-right: 8px"
                              @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                            >
                              Search
                            </a-button>
                            <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
                              Reset
                            </a-button>
                          </div>
                          <a-icon
                            slot="filterIcon"
                            slot-scope="filtered"
                            type="search"
                            :style="{ color: filtered ? '#108ee9' : undefined }"
                          />
                          <template slot="customRender" slot-scope="text, record, index, column">
                              <span v-if="searchText && searchedColumn === column.dataIndex">
                                <template
                                  v-for="(fragment, i) in text
                                    .toString()
                                    .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
                                >
                                  <mark
                                    v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                                    :key="i"
                                    class="highlight"
                                  >{{ fragment }}</mark
                                  >
                                  <template v-else>{{ fragment }}</template>
                                </template>
                              </span>
                            <template v-else>
                              {{ text }}
                            </template>
                          </template>
                        </a-table>
                      </template>
                    </a-tab-pane>


                    <a-tab-pane key="4" tab="Actuator List">
                      <template>
                        <a-table :data-source="simulationData.actuatorData" :columns="actuatorColumns">
                          <div
                            slot="filterDropdown"
                            slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                            style="padding: 8px"
                          >
                            <a-input
                              v-ant-ref="c => (searchInput = c)"
                              :placeholder="`Search ${column.dataIndex}`"
                              :value="selectedKeys[0]"
                              style="width: 188px; margin-bottom: 8px; display: block;"
                              @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                              @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                            />
                            <a-button
                              type="primary"
                              icon="search"
                              size="small"
                              style="width: 90px; margin-right: 8px"
                              @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                            >
                              Search
                            </a-button>
                            <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
                              Reset
                            </a-button>
                          </div>
                          <a-icon
                            slot="filterIcon"
                            slot-scope="filtered"
                            type="search"
                            :style="{ color: filtered ? '#108ee9' : undefined }"
                          />
                          <template slot="customRender" slot-scope="text, record, index, column">
                              <span v-if="searchText && searchedColumn === column.dataIndex">
                                <template
                                  v-for="(fragment, i) in text
                                    .toString()
                                    .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
                                >
                                  <mark
                                    v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                                    :key="i"
                                    class="highlight"
                                  >{{ fragment }}</mark
                                  >
                                  <template v-else>{{ fragment }}</template>
                                </template>
                              </span>
                            <template v-else>
                              {{ text }}
                            </template>
                          </template>
                        </a-table>
                      </template>
                    </a-tab-pane>


                    <a-tab-pane key="5" tab="Link List">
                      <template>
                        <a-table bordered :data-source="simulationData.linkData" :columns="linkColumns">
                          <div
                            slot="filterDropdown"
                            slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                            style="padding: 8px"
                          >
                            <a-input
                              v-ant-ref="c => (searchInput = c)"
                              :placeholder="`Search ${column.dataIndex}`"
                              :value="selectedKeys[0]"
                              style="width: 188px; margin-bottom: 8px; display: block;"
                              @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                              @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                            />
                            <a-button
                              type="primary"
                              icon="search"
                              size="small"
                              style="width: 90px; margin-right: 8px"
                              @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                            >
                              Search
                            </a-button>
                            <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
                              Reset
                            </a-button>
                          </div>
                          <a-icon
                            slot="filterIcon"
                            slot-scope="filtered"
                            type="search"
                            :style="{ color: filtered ? '#108ee9' : undefined }"
                          />
                          <template slot="customRender" slot-scope="text, record, index, column">
                              <span v-if="searchText && searchedColumn === column.dataIndex">
                                <template
                                  v-for="(fragment, i) in text
                                    .toString()
                                    .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
                                >
                                  <mark
                                    v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                                    :key="i"
                                    class="highlight"
                                  >{{ fragment }}</mark
                                  >
                                  <template v-else>{{ fragment }}</template>
                                </template>
                              </span>
                            <template v-else>
                              {{ text }}
                            </template>
                          </template>
                        </a-table>
                      </template>
                    </a-tab-pane>

                  </a-tabs>
                </div>
              </template>
              <!-- 绘制模式 end  -->



              <!-- 插入设备 begin -->
              <div v-else-if = "contentType=='addFogDevice'">
                <template>
                  <a-form-model :model="fogDeviceData" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-form-model-item label="Name">
                      <a-input v-model="fogDeviceData.name" />
                    </a-form-model-item>
                    <a-form-model-item label="Level">
                      <a-input v-model="fogDeviceData.level" />
                    </a-form-model-item>
                    <a-form-model-item label="Uplink Bw">
                      <a-input v-model="fogDeviceData.uplinkBw" />
                    </a-form-model-item>
                    <a-form-model-item label="Downlink Bw">
                      <a-input v-model="fogDeviceData.downlinkBw" />
                    </a-form-model-item>
                    <a-form-model-item label="Mips">
                      <a-input v-model="fogDeviceData.mips" />
                    </a-form-model-item>
                    <a-form-model-item label="Ram">
                      <a-input v-model="fogDeviceData.ram" />
                    </a-form-model-item>
                    <a-form-model-item label="Rate/MIPS">
                      <a-input v-model="fogDeviceData.ratePerMips" />
                    </a-form-model-item>
                    <a-form-model-item label="BusyPower">
                      <a-input v-model="fogDeviceData.busyPower" />
                    </a-form-model-item>
                    <a-form-model-item label="IdlePower">
                      <a-input v-model="fogDeviceData.idlePower" />
                    </a-form-model-item>
                    <a-form-model-item :wrapper-col="{ span: 14, offset: 10 }">
                      <a-button type="primary" @click="createFogDevice">
                        Create
                      </a-button>
                      <a-button style="margin-left: 10px;">
                        Cancel
                      </a-button>
                    </a-form-model-item>
                  </a-form-model>
                </template>
              </div>
              <!-- 插入设备 end -->

              <!-- 插入传感器 begin -->
              <div v-else-if = "contentType=='addSensor'">
                <template>
                  <a-form-model :model="sensorData" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-form-model-item label="Name">
                      <a-input v-model="sensorData.name" />
                    </a-form-model-item>
                    <a-form-model-item label="Type">
                      <a-input v-model="sensorData.type" />
                    </a-form-model-item>
          <!--          <a-form-model-item label="Distribution Type">
                      <a-input v-model="sensorData.distributionType" />
                    </a-form-model-item>
                    <a-form-model-item label="Mean">
                      <a-input v-model="sensorData.mean" />
                    </a-form-model-item>
                    <a-form-model-item label="Min">
                      <a-input v-model="sensorData.min" />
                    </a-form-model-item>
                    <a-form-model-item label="Max">
                      <a-input v-model="sensorData.max" />
                    </a-form-model-item>
                    <a-form-model-item label="StdDev">
                      <a-input v-model="sensorData.stdDev" />
                    </a-form-model-item>-->
                    <a-form-model-item label="Deterministic Value">
                      <a-input v-model="sensorData.deterministicValue" />
                    </a-form-model-item>
                    <a-form-model-item :wrapper-col="{ span: 14, offset: 10 }">
                      <a-button type="primary" @click="createSensor">
                        Create
                      </a-button>
                      <a-button style="margin-left: 10px;">
                        Cancel
                      </a-button>
                    </a-form-model-item>
                  </a-form-model>
                </template>
              </div>
              <!-- 插入传感器 end -->


              <!-- 插入触发器 begin -->
              <div v-else-if = "contentType=='addActuator'">
                <template>
                  <a-form-model :model="actuatorData" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-form-model-item label="Name">
                      <a-input v-model="actuatorData.name" />
                    </a-form-model-item>
                    <a-form-model-item label="Type">
                      <a-input v-model="actuatorData.type" />
                    </a-form-model-item>
                    <a-form-model-item :wrapper-col="{ span: 14, offset: 10 }">
                      <a-button type="primary" @click="createActuator">
                        Create
                      </a-button>
                      <a-button style="margin-left: 10px;">
                        Cancel
                      </a-button>
                    </a-form-model-item>
                  </a-form-model>
                </template>
              </div>
              <!-- 插入触发器 end -->



              <!-- 插入连接 begin -->
              <div v-else-if = "contentType=='addLink'">
                <template>
                  <a-form-model :model="linkData" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-form-model-item label="Start Node">
                      <a-input v-model="linkData.startNode" />
                    </a-form-model-item>
                    <a-form-model-item label="Target Node">
                      <a-input v-model="linkData.endNode" />
                    </a-form-model-item>
                    <a-form-model-item label="Latency">
                      <a-input v-model="linkData.latency" />
                    </a-form-model-item>
                    <a-form-model-item :wrapper-col="{ span: 14, offset: 10 }">
                      <a-button type="primary" @click="createLink">
                        Create
                      </a-button>
                      <a-button style="margin-left: 10px;">
                        Cancel
                      </a-button>
                    </a-form-model-item>
                  </a-form-model>
                </template>
              </div>
              <!-- 插入连接 end -->


              <!-- 查看结果 begin -->
              <div v-else-if = "contentType=='getResult'">
                <div>
                  <a-tabs default-active-key="1" @change="callback">
                    <a-tab-pane key="1" tab="preMessage">
                      <br>
                      <template>
                        <div style="width: 1100px">
                          <a-tabs default-active-key="1" :tab-position="tabPosition">
                            <a-tab-pane key="1" tab="placeMessage">
                              <template>
                                <a-table :columns="placeMessageColumns" :data-source="simulationResult.preMessage.placeMessage">
                                  <a slot="name" slot-scope="text">{{ text }}</a>
                                  <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
                                  <span slot="tags" slot-scope="tags">
                                      <a-tag
                                        v-for="tag in tags"
                                        :key="tag"
                                        :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
                                      >
                                        {{ tag.toUpperCase() }}
                                      </a-tag>
                                    </span>
                                                                  <span slot="action" slot-scope="text, record">
                                      <a>Invite 一 {{ record.name }}</a>
                                      <a-divider type="vertical" />
                                      <a>Delete</a>
                                      <a-divider type="vertical" />
                                      <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
                                    </span>
                                </a-table>
                              </template>
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="createMessage">
                              <a-table :columns="createMessageColumns" :data-source="simulationResult.preMessage.createMessage">
                                <a slot="name" slot-scope="text">{{ text }}</a>
                                <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
                                <span slot="tags" slot-scope="tags">
                                      <a-tag
                                        v-for="tag in tags"
                                        :key="tag"
                                        :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
                                      >
                                        {{ tag.toUpperCase() }}
                                      </a-tag>
                                    </span>
                                <span slot="action" slot-scope="text, record">
                                      <a>Invite 一 {{ record.name }}</a>
                                      <a-divider type="vertical" />
                                      <a>Delete</a>
                                      <a-divider type="vertical" />
                                      <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
                                    </span>
                              </a-table>
                            </a-tab-pane>
                          </a-tabs>
                        </div>
                      </template>
                    </a-tab-pane>




                    <a-tab-pane key="3" tab="resultMessage">
                      <template>
                        <a-row :gutter="16">
                          <a-col :span="12">
                            <a-statistic title="costInCloud" :value="simulationResult.resultMessage.costInCloud" style="margin-right: 50px">
                            </a-statistic>
                          </a-col>
                          <a-col :span="12">
                            <a-statistic title="totalNetworkUsage" :value="simulationResult.resultMessage.totalNetworkUsage" class="demo-class">
                            </a-statistic>
                          </a-col>
                        </a-row>
                      </template>
                      <br>
                      <div style="width: 1100px">
                        <a-tabs default-active-key="1" :tab-position="tabPosition">
                          <a-tab-pane key="1" tab="device">
                            <a-table :columns="deviceColumns" :data-source="simulationResult.resultMessage.device">
                              <a slot="name" slot-scope="text">{{ text }}</a>
                              <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
                              <span slot="tags" slot-scope="tags">
                                      <a-tag
                                        v-for="tag in tags"
                                        :key="tag"
                                        :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
                                      >
                                        {{ tag.toUpperCase() }}
                                      </a-tag>
                                    </span>
                              <span slot="action" slot-scope="text, record">
                                      <a>Invite 一 {{ record.name }}</a>
                                      <a-divider type="vertical" />
                                      <a>Delete</a>
                                      <a-divider type="vertical" />
                                      <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
                                    </span>
                            </a-table>
                          </a-tab-pane>
                        </a-tabs>
                      </div>
                    </a-tab-pane>




                  </a-tabs>
                </div>
              </div>
              <!-- 查看结果 end -->

              <!-- 载入拓扑 begin -->
              <div v-if = "contentType=='uploadTopo'">
                <template>
                  <a-textarea placeholder="输入数据" v-model="simuData" :rows="10" />
                  <br><br>
                  <a-button type="primary" style="float:right" @click="importTopo">
                    载入
                  </a-button>
                  <p style="text-align:center;">载入拓扑请使用我们提供的数据格式,否则系统将无响应</p>
                </template>
              </div>
              <!-- 载入拓扑 end -->

              <!-- 输出拓扑 begin -->
              <div v-if = "contentType=='downloadTopo'">
                <a-textarea id="downloadTopoInput" v-model="this.simulationDataString" :rows="10" />
                <br><br>
                <a-button type="primary" style="float:right" @click="copyTopo">
                  复制
                </a-button>
              </div>
              <!-- 输出拓扑 end -->

            </a-layout-content>
            <!-- 正文内容 end -->
          </a-layout>
        </a-layout-content>
        <!-- 主体部分 end -->
        <!-- 底部 begin -->
        <a-layout-footer class = "footer">
          iFogSimForWeb ©2020 Created by WirelessXY
        </a-layout-footer>
        <!-- 底部 end -->
      </a-layout>
    </template>

<style>
  #components-layout-demo-top-side .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 28px 16px 0;
    float: left;
  }
  #components-layout-demo-top-side .footer {
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 50px;
    text-align:center;
  }
   .highlight {
     background-color: rgb(255, 192, 105);
     padding: 0px;
   }


  .editable-row-operations a {
    margin-right: 8px;
  }
</style>
  <script>
    const fogDeviceColumns= [
      {
        title: 'Name',
        dataIndex: 'nodeName',
        key: 'nodeName',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) =>
          record.nodeName
            .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
        if (visible) {
        setTimeout(() => {
        this.searchInput.focus();
      }, 0);
    }
    },
    },
      {
        title: 'Level',
        dataIndex: 'level',
        key: 'level',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) =>
          record.level
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'uplinkBw',
        dataIndex: 'upBw',
        key: 'upBw',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) =>
          record.upBw
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'downlinkBw',
        dataIndex: 'downBw',
        key: 'downBw',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) =>
          record.downBw
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'mips',
        dataIndex: 'mips',
        key: 'mips',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) =>
          record.mips
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'Ram',
        dataIndex: 'ram',
        key: 'ram',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) =>
          record.ram
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'RatePerMips',
        dataIndex: 'ratePerMips',
        key: 'ratePerMips',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) =>
          record.ratePerMips
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'IdlePower',
        dataIndex: 'idlePower',
        key: 'idlepower',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) =>
          record.idlePower
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'BusyPower',
        dataIndex: 'busyPower',
        key: 'busyPower',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) =>
          record.busyPower
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
    ];
    const sensorColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) =>
          record.name
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'Type',
        dataIndex: 'sensorType',
        key: 'sensorType',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) =>
          record.sensorType
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'Distribution Type',
        dataIndex: 'distributionType',
        key: 'distributionType',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) =>
          record.distributionType
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'Mean',
        dataIndex: 'mean',
        key: 'mean',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) =>
          record.mean
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'StdDev',
        dataIndex: 'stdDev',
        key: 'stdDev',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) =>
          record.stdDev
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'Min',
        dataIndex: 'min',
        key: 'min',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) =>
          record.min
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'Max',
        dataIndex: 'max',
        key: 'max',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) =>
          record.max
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'Deterministic Value',
        dataIndex: 'deterministicValue',
        key: 'deterministicValue',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) =>
          record.deterministicValue
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
    ];
    const actuatorColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) =>
          record.name
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'Type',
        dataIndex: 'actuatorType',
        key: 'actuatorType',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) =>
          record.actuatorType
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
    ];
    const linkColumns = [
      {
        title: 'StartNodeName ',
        dataIndex: 'startNodeName',
        key: 'startNodeName',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'startNodeName',
        },
        onFilter: (value, record) =>
          record.startNodeName
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'TargetNodeName ',
        dataIndex: 'targetNodeName',
        key: 'targetNodeName',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'targetNodeName',

        },
        onFilter: (value, record) =>
          record.targetNodeName
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'Latency ',
        dataIndex: 'latency',
        key: 'latency',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'latency',
        },
        onFilter: (value, record) =>
          record.latency
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
    ];
    const placeMessageColumns = [
      {
        title: 'PlaceName ',
        dataIndex: 'placeName',
        key: 'placeName',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'placeName',
        },
        onFilter: (value, record) =>
          record.placeName
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'PlaceOnName ',
        dataIndex: 'placeOnName',
        key: 'placeOnName',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'placeOnName',
        },
        onFilter: (value, record) =>
          record.placeOnName
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'Status ',
        dataIndex: 'status',
        key: 'status',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'status',
        },
        onFilter: (value, record) =>
          record.status
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
    ];
    const createMessageColumns =[
      {
        title: 'CreateName ',
        dataIndex: 'createName',
        key: 'createName',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'createName',
        },
        onFilter: (value, record) =>
          record.createName
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'CreateOnName ',
        dataIndex: 'createOnName',
        key: 'createOnName',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'createOnName',
        },
        onFilter: (value, record) =>
          record.createOnName
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'Status ',
        dataIndex: 'status',
        key: 'status',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'status',
        },
        onFilter: (value, record) =>
          record.status
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
    ];
    const tupleColumns = [
      {
        title: 'STATE ',
        dataIndex: 'PLAYER_GAME_STATE',
        key: 'PLAYER_GAME_STATE',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'PLAYER_GAME_STATE',
        },
        onFilter: (value, record) =>
          record.PLAYER_GAME_STATE
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'EEG ',
        dataIndex: 'EEG',
        key: 'EEG',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'createName',
        },
        onFilter: (value, record) =>
          record.EEG
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'concentration ',
        dataIndex: 'CONCENTRATION',
        key: 'CONCENTRATION',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'CONCENTRATION',
        },
        onFilter: (value, record) =>
          record.CONCENTRATION
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'sensor ',
        dataIndex: '_SENSOR',
        key: '_SENSOR',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: '_SENSOR',
        },
        onFilter: (value, record) =>
          record._SENSOR
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'Global State ',
        dataIndex: 'GLOBAL_GAME_STATE',
        key: 'GLOBAL_GAME_STATE',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'GLOBAL_GAME_STATE',
        },
        onFilter: (value, record) =>
          record.GLOBAL_GAME_STATE
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
    ];
    const deviceColumns = [
      {
        title: 'DeviceName ',
        dataIndex: 'deviceName',
        key: 'deviceName',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'deviceName',
        },
        onFilter: (value, record) =>
          record.deviceName
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'Cost ',
        dataIndex: 'cost',
        key: 'cost',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'cost',
        },
        onFilter: (value, record) =>
          record.cost
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
    ];
    function isnull(val) {
      if (val == '' || val == undefined || val == null)
      {
        return true;
      }
      var str = val.replace(/(^\s*)|(\s*$)/g, '');//去除空格;
      if (str == '' || str == undefined || str == null) {
        return true;
      } else {
        return false;
      }
    }

    export default {
      data() {
        return {
          tabPosition: 'left',
          editingKey: '',
          contentType: 'topo',
          labelCol: {span: 4},
          wrapperCol: {span: 14},
          fogDeviceData: {
            name: '',
            level: '',
            uplinkBw: '',
            downlinkBw: '',
            mips: '',
            ram: '',
            ratePerMips: '',
            idlePower: '',
            busyPower: '',
          },
          sensorData: {
            name: '',
            type: '',
            distributionType: 'Deterministic',
            mean: '-1',
            stdDev: '-1',
            min: '-1',
            max: '-1',
            deterministicValue: '',
          },
          actuatorData: {
            name: '',
            type: '',
          },
          linkData: {
            startNode: '',
            endNode: '',
            latency: '',
          },
          simulationData: {
            "linkData": [],
            "actuatorData": [],
            "fogDeviceData": [],
            "sensorData": []
          },
          fogDeviceColumns,
          sensorColumns,
          actuatorColumns,
          linkColumns,
          placeMessageColumns,
          createMessageColumns,
          tupleColumns,
          deviceColumns,
          searchText: '',
          searchInput: null,
          searchedColumn: '',
          simuData:'',
          simulationDataString:'',
          simulationResult:{
            preMessage:{
              placeMessage:[],
              createMessage:[],
            },
            runMessage:{
              execTime:'',
              appLoopDelay:'',
              tuple:{},
            },
            resultMessage:{
              costInCloud:'',
              totalNetworkUsage:'',
              device:[],
            },
          },
        };
      },



      methods: {
        changeContentType:function(contentType){
          this.contentType = contentType;
          this.simulationDataString =  JSON.stringify(this.simulationData);
        },
        createFogDevice:function(){
          if(isnull(this.fogDeviceData.name)||isnull(this.fogDeviceData.level)
          ||isnull(this.fogDeviceData.uplinkBw)||isnull(this.fogDeviceData.downlinkBw)||
            isnull(this.fogDeviceData.mips)||isnull(this.fogDeviceData.ram)
          ||isnull(this.fogDeviceData.ratePerMips) ||isnull(this.fogDeviceData.busyPower)
            ||isnull(this.fogDeviceData.idlePower)
          ){
            alert("数据不能为空,请重新输入");
            return ;
          }
          var fogDevice = {
            nodeName: this.fogDeviceData.name,
            level:this.fogDeviceData.level,
            upBw:this.fogDeviceData.uplinkBw,
            downBw:this.fogDeviceData.downlinkBw,
            mips:this.fogDeviceData.mips,
            ram:this.fogDeviceData.ram,
            ratePerMips:this.fogDeviceData.ratePerMips,
            busyPower:this.fogDeviceData.busyPower,
            idlePower:this.fogDeviceData.idlePower,
          };
          console.log(this.fogDeviceData);
          if(this.simulationData.fogDeviceData.push(fogDevice) != -1)
              alert("FogDevice: "+this.fogDeviceData.name+" 创建成功");
          else
              alert("创建失败");
          console.log(this.simulationData.fogDeviceData);
        },
        createSensor:function(){
          if(isnull(this.sensorData.name)||isnull(this.sensorData.type)||isnull(this.sensorData.distributionType)
          ||isnull(this.deterministicValue))
          {
            alert("数据不能为空,请重新输入");
            return ;
          }
          var sensor = {
            name:this.sensorData.name,
            sensorType:this.sensorData.type,
            distributionType:this.sensorData.distributionType,
            mean:this.sensorData.mean,
            stdDev:this.sensorData.stdDev,
            min:this.sensorData.min,
            max:this.sensorData.max,
            deterministicValue:this.sensorData.deterministicValue,
          };
          console.log(this.sensorData);
          console.log(this.simulationData.sensorData);
          if(this.simulationData.sensorData.push(sensor) != -1)
            alert(this.sensorData.name+"创建成功");
          else
            alert("创建失败");
        },
        createActuator:function(){
          if(isnull(this.actuatorData.name)||isnull(this.actuatorData.type)){
            alert("数据不能为空,请重新输入");
            return ;
          }
          var actuator = {
            name:this.actuatorData.name,
          actuatorType:this.actuatorData.type,
          };
          console.log(this.actuatorData);
          console.log(this.simulationData.actuatorData);
          if(this.simulationData.actuatorData.push(actuator) != -1)
            alert(this.actuatorData.name+"创建成功");
          else
            alert("创建失败");
        },
        createLink:function(){
          if(isnull(this.linkData.latency)||isnull(this.linkData.endNode)||isnull(this.linkData.startNode)){
            alert("数据不能为空.请重新输入");
            return ;
          }
          var link = {
            startNodeName :this.linkData.startNode,
            targetNodeName:this.linkData.endNode,
            latency:this.linkData.latency,
          };
          console.log(this.linkData);
          this.simulationData.linkData.push(link);
          console.log(this.simulationData.linkData);
          if( this.simulationData.linkData.push(link) != -1)
            alert("创建成功");
          else
            alert("创建失败");
        },
        iFogSimSimulation:function(){
          console.log(this.simulationData);
          if(this.simulationData.fogDeviceData.length==0||this.simulationData.sensorData.length==0
          ||this.simulationData.linkData.length==0||this.simulationData.actuatorData.length==0){
            alert("当前拓扑数据不符合要求,请检查");
            return ;
          }
          this.contentType = 'getResult';
          this.$http.post("http://zhzero.top:8080/api/post",JSON.stringify(this.simulationData), {emulateJSON:true}).then(function(res){
            var dataret = JSON.parse(res.bodyText);
            console.log(res.bodyText);
            this.simulationResult = eval("(" + res.bodyText + ")");
            console.log(this.simulationResult );
         /*   if (dataret.code == 200)
            {
              console.log(res.bodyText);
            }*/
          },function(res){
            alert("无法查看(Unknown Reason)");
          });
        },
        callback(key) {
          console.log(key);
        },
        handleSearch(selectedKeys, confirm, dataIndex) {
          confirm();
          this.searchText = selectedKeys[0];
          this.searchedColumn = dataIndex;
        },

        handleReset(clearFilters) {
          clearFilters();
          this.searchText = '';
        },
        importTopo:function(){
          console.log(typeof(this.simuData));
          console.log(typeof(this.simulationData));
          if(this.simulationData =  eval("(" + this.simuData + ")"))
              alert("载入成功");
          console.log(this.simulationData);
        },
        copyTopo:function(){
          console.log(typeof(this.simulationData));
          console.log((this.simulationDataString));
          var input = document.getElementById('downloadTopoInput');
          input.select();
          document.execCommand("Copy");
          alert("已复制到剪贴板");
        },
        onSelect(selectedKeys, info) {
          console.log('selected', selectedKeys, info);
        },
        onCheck(checkedKeys, info) {
          console.log('onCheck', checkedKeys, info);
        },
    },}
  </script>
