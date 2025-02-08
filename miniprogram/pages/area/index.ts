// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

interface AreaItem {
  id: string;
  name: string;
  icon: string;
  itemCount: number;
  isEncrypted: boolean;
}

Component({
  data: {
    areas: [] as AreaItem[],
    page: 1,
    isRefreshing: false
  },
  methods: {
    // 事件处理函数
    bindViewTap() {
      wx.navigateTo({
        url: '../logs/logs',
      })
    },
    onSearch(e: any) {
      const keyword = e.detail.value;
      // TODO: 实现搜索逻辑
    },
    async onPullDownRefresh() {
      console.log("--onPullDownRefresh")
      this.setData({ isRefreshing: true });
      try {
        await this.loadAreas(1);
        this.setData({ page: 1 });
      } finally {
        console.log("--stopPullDownRefresh1")
        this.setData({ isRefreshing: false });
        wx.stopPullDownRefresh()
      }
    },



    async onReachBottom() {
      console.log("--onReachBottom")
      try {
        // Add 600ms delay
       // await new Promise(resolve => setTimeout(resolve, 600));
        await this.loadAreas(this.data.page + 1);
        this.setData({ page: this.data.page + 1 });
      } finally {
        console.log("--stopPullDownRefresh")
        this.setData({ isRefreshing: false });
        wx.stopPullDownRefresh()
      }
    },
    async loadAreas(page: number) {
      console.log("page ---> "+page)
      const mockAreas: AreaItem[] = [];
        for (let i = 1; i <= 20; i++) {
          var id = ( page * 20 + i ).toString()
          console.log("id ---> "+id)
          mockAreas.push({
          id:id,
          name: i % 2 === 0 ? '书房大书'+( page * 20 + i ).toString() : '客厅' +( page * 20 + i ).toString(),
          icon: '/assets/images/tab/' + (i % 2 === 0 ? 'checkin.png' : 'plus.png'),
          itemCount: Math.floor(Math.random() * 1000) + 1,
          isEncrypted: i % 3 === 0
          });
        }
      if (page === 1) {
        this.setData({ areas: mockAreas });
      } else {
        this.setData({ areas: [...this.data.areas, ...mockAreas] });
      }
    },
    onAreaTap(e: any) {
      const areaId = e.currentTarget.dataset.id;
      // TODO: 跳转到区域详情页
    },
    navigateToAdd() {
      console.log("V11111")
      wx.navigateTo({
        url: '/pages/add/index'
      });
    }
  },
  lifetimes: {
    attached() {
      this.loadAreas(1);
    }
  }
})
