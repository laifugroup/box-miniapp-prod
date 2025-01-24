Page({
  data: {
    name: '',
    location: '',
     image: '',
     categories: [
      {
        id: 1,
        name: '武侯大道',
        children: [
          {
            id: 11,
            name: '卧室',
            children: [
              { id: 111, name: '床头柜' },
              { id: 112, name: '衣帽间' }
            ]
          },
          {
            id: 12,
            name: '厨房',
            children: [
              { id: 121, name: '橱柜' },
              { id: 122, name: '冰箱' }
            ]
          }
        ]
      },
      {
        id: 2,
        name: '天府广场',
        children: [
          {
            id: 21,
            name: '一楼',
            children: [
              { id: 211, name: '冰箱' },
              { id: 212, name: '微波炉' }
            ]
          },
          {
            id: 22,
            name: '阁楼',
            children: [
              { id: 221, name: '保险柜' },
              { id: 222, name: '大保险柜' }
            ]
          }
        ]
      }
    ],
    categoryRanges: [[], [], []] as string[][], // 明确指定类型为string[][]
    selectedCategoryNames:""  as string, // 明确指定类型为string[]
    selectedIndexes: [0, 0, 0] as number[], // 明确指定类型为number[]
  },

  
  onLoad() {
    this.initCategoryPicker();
  },
  // 初始化分类选择器数据
  initCategoryPicker() {
    const ranges = [[], [], []] as string[][];
    // 一级分类
    ranges[0] = this.data.categories.map(c => c.name);
    // 默认二级分类
    ranges[1] = this.data.categories[0].children.map(c => c.name);
    // 默认三级分类
    ranges[2] = this.data.categories[0].children[0].children.map(c => c.name);

    this.setData({
      categoryRanges: ranges
    });
  },

  // 分类选择变化
  onCategoryChange(e: any) {
    const [firstIndex, secondIndex, thirdIndex] = e.detail.value;
    const selectedCategory = [
      this.data.categories[firstIndex],
      this.data.categories[firstIndex].children[secondIndex],
      this.data.categories[firstIndex].children[secondIndex].children[thirdIndex]
    ];


    this.setData({
      selectedCategory,
      selectedCategoryNames: selectedCategory.map(c => c.name).join('/'),
      selectedIndexes: [firstIndex, secondIndex, thirdIndex]
    });
  },

  // 列变化时更新数据
  onColumnChange(e: any) {
    const { column, value } = e.detail;
    const ranges = this.data.categoryRanges;
    const indexes = [...this.data.selectedIndexes];
    indexes[column] = value;

    if (column === 0) {
      // 一级分类变化
      ranges[1] = this.data.categories[value].children.map(c => c.name);
      ranges[2] = this.data.categories[value].children[0].children.map(c => c.name);
      indexes[1] = 0;
      indexes[2] = 0;
    } else if (column === 1) {
      // 二级分类变化
      ranges[2] = this.data.categories[indexes[0]].children[value].children.map(c => c.name);
      indexes[2] = 0;
    }

    this.setData({
      categoryRanges: ranges,
      selectedIndexes: indexes
    });
  },

    
  onNameInput(e: any) {
    this.setData({
      name: e.detail.value
    })
  },

  onLocationInput(e: any) {
    this.setData({
      location: e.detail.value
    })
  },

  async chooseImage() {
    const res = await wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera']
    })
    
    this.setData({
      image: res.tempFilePaths[0]
    })
  },

  async submitForm() {
    // TODO: 提交表单到后端
    wx.navigateBack()
  }
}) 