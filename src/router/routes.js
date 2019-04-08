export default [{
    path: "/",
    component: () => import('@/pages/win_a'),
    //默认指向的路由
    redirect: '/welcome',
    children: [{
        //首页
        path: "/win_a/home",
        component: () => import("@/pages/win_a/home")
      },
      {
        //购物车
        path: "/win_a/shopcart",
        component: () => import("@/pages/win_a/shopCart")
      },
      {
        //推广
        path: "/win_a/extension",
        component: () => import("@/pages/win_a/extension"),
        meta: {
          requiresAuth: true
        },
      },
      {
        //我的
        path: "/win_a/mine",
        component: () => import("@/pages/win_a/mine"),
        meta: {
          requiresAuth: true
        },
      }

    ]
  },
  //登录页面
  {
    path: "/login",
    component: () => import('@/pages/login'),
    props: (route) => ({
      redirect: route.query.redirect
    })
  },
  //分类页面
  {
    path: "/category/:cid/:name",
    component: () => import('@/pages/category')
  },
  //产品页面
  {
    path: '///product/:id',
    component: () => import('@/pages/product')
  },
  //结算
  {
    path: '//simple/order',
    component: () => import('@/pages/simpleOrder'),
    meta: {
      requiresAuth: true
    },
  },
  //我的订单
  {
    path: '/ucenter/order/:type',
    component: () => import('@/pages/ucenterOrder'),
    meta: {
      requiresAuth: true
    },
  },
  //我的关注
  {
    path: "//ucenter/attention",
    component: () => import('@/pages/ucenterAttention'),
    meta: {
      requiresAuth: true
    },
  },
  //商品咨询
  {
    path: "//ucenter/consult",
    component: () => import('@/pages/ucenterConsult'),
    meta: {
      requiresAuth: true
    },
  },

  //我的消息
  {
    path: '//ucenter/message',
    component: () => import('@/pages/ucenterMessage'),
    meta: {
      requiresAuth: true
    },

  },
  //团队会员
  {
    path: '//ucenter/team',
    component: () => import('@/pages/ucenterTeam'),
    meta: {
      requiresAuth: true
    },

  },
  //我的会员相关
  {
    path: '//ucenter/member',
    component: () => import('@/pages/ucenterMember'),
    mata: {
      requiresAuth: true
    }
  },
  //账户安全
  {
    path: '//ucenter/safety',
    component: () => import('@/pages/ucenterSafety'),
    meta: {
      requiresAuth: true
    },

  },
  //收货地址
  {
    path: '//ucenter/address',
    component: () => import('@/pages/ucenterAddress'),
    meta: {
      requiresAuth: true
    },

  },
  //银行卡管理
  {
    path: '//ucenter/bank/:type',
    component: () => import('@/pages/ucenterBank'),
    meta: {
      requiresAuth: true
    },

  },
  //推广中心
  {
    path: '//ucenter/extension',
    component: () => import('@/pages/ucenterExtension'),
    meta: {
      requiresAuth: true
    },

  },
  //设置
  {
    path: '//ucenter/info',
    component: () => import('@/pages/ucenterInfo'),
    meta: {
      requiresAuth: true
    },
  },
  //订单详情
  {
    path: "/ucenter/orderdetail/:id",
    component: () => import('@/pages/ucenterOrderdetail'),
    meta: {
      requiresAuth: true
    },
  },
  //支付
  {
    path: "/simple/order_status/:id",
    component: () => import('@/pages/simpleOrderstatusOrderId'),
    meta: {
      requiresAuth: true
    },
  },
  //支付完成
  {
    path: "/simple/order_statusW/:id",
    component: () => import('@/pages/simpleOrderstatusW'),
    meta: {
      requiresAuth: true
    },
  },
  //修改登录密码
  {
    path: "/ucenter/check_identity/obj/password",
    component: () => import('@/pages/ucenterCheck_identityObjPassword'),
    meta: {
      requiresAuth: true
    },
  },
  //修改支付密码
  {
    path: "/ucenter/update_obj/r/paypassword",
    component: () => import('@/pages/ucenterUpdate_objRepayPassword'),
    meta: {
      requiresAuth: true
    },
  },
  //添加收货地址
  {
    path: "///simple/address_other",
    component: () => import('@/pages/addUcenterAddress'),
    meta: {
      requiresAuth: true
    },
  },
  //修改收货地址
  {
    path: "///simple/address_other/change",
    component: () => import('@/pages/addUcenterAddress'),
    props: (route) => ({
      query: route.query
    }),
    meta: {
      requiresAuth: true
    },
  },
  //支付中
  {
    path: "///payment/dopay",
    component: () => import('@/pages/paymentDopay'),
    props: (route) => ({
      query: route.query
    }),
    meta: {
      requiresAuth: true
    },
  },

  //评论
  {
    path: "////product_comment/:gid",
    component: () => import('@/pages/productComment'),
  },

  //商品详细介绍
  {
    path: '////productDiscription/:gid',
    component: () => import('@/pages/productDiscription'),
  },

  //用户注册
  {
    path: "//simpleReg",
    component: () => import('@/pages/simpleReg')
  },

  //流水记录
  {
    path: "/ucenter/bonus_list/:type",
    component: () => import('@/pages/flowRecord'),
    meta: {
      requiresAuth: true
    },
  },

  //提现
  {
    path: '///putForward',
    component: () => import('@/pages/putForward'),
    meta: {
      requiresAuth: true
    },
  },

  //交易记录
  {
    path: '///transactionRecord/:type',
    component: () => import('@/pages/transactionRecord'),
    meta: {
      requiresAuth: true
    },
  },

  //转账
  {
    path: "///transferAccounts",
    component: () => import('@/pages/transferAccounts'),
    meta: {
      requiresAuth: true
    },
  },

  //奖转余额
  {
    path: "///awardTransferBalance",
    component: () => import('@/pages/awardTransferBalance'),
    meta: {
      requiresAuth: true
    },

  },

  //搜索页
  {
    path: "///searchResult",
    component: () => import('@/pages/searchResult')
  },

  //短信验证码
  {
    path: "////verificationCode",
    component: () => import('@/pages/verificationCode'),
    props: (route) => ({
      redirect: route.query.redirect
    })
  },

  //找回密码
  {
    path: "//retrievePassword",
    component: () => import('@/pages/retrievePassword')
  },

  // 找回密码修改密码页
  {
    path: '//simpleApiResetPassword',
    component: () => import('@/pages/simpleApiResetPassword'),
    props: (route) => ({
      safecode: route.query.safecode
    })
  },

  //修改绑定手机
  {
    path: "///ucenter/rebindmobile",
    component: () => import('@/pages/rebindmobile'),
    meta: {
      requiresAuth: true
    },
  },

  //商品评价列表
  {
    path: "//ucenter/review",
    component: () => import('@/pages/ucenterReview'),
    meta: {
      requiresAuth: true
    },

  },

  //商品评价
  {
    path: "/index/review/id/:id",
    component: () => import('@/pages/indexReview'),
    meta: {
      requiresAuth: true
    },
  },

  //酒米记录
  {
    path: "//ucenter/winerice",
    component: () => import('@/pages/ucenterApiWinerice'),
    meta: {
      requiresAuth: true
    },
  },

  //酒米抛售
  {
    path: "///ucenter/sellrice",
    component: () => import('@/pages/ucenterSellrice'),
    meta: {
      requiresAuth: true
    },
  },
  // 酒米兑换
  {
    path: "///ucenter/exchange",
    component: () => import('@/pages/ucenterExchange'),
    meta: {
      requiresAuth: true
    }
  },
  //礼物订单
  {
    path: '//ucenter/gifts',
    component: () => import('@/pages/ucenterGifts'),
    meta: {
      requiresAuth: true
    }
  },
  //接收礼物
  {
    path: '//ucenter/get_gifts',
    component: () => import('@/pages/ucenterGetGifts'),
    mate: {
      requireAuth: true
    }
  },
  //礼物订单详情
  {
    path: '//ucenter/gifts/OrderDetail',
    component: () => import('@/pages/ucenterGiftOrderDetail'),
    meta: {
      requiresAuth: true
    },
  },
  //制作礼物
  {
    path: '//gift/make',
    component: () => import('@/pages/giftMake'),
    meta: {
      requiresAuth: true
    },
  },
  //礼包列表
  {
    path: '//gift/list',
    component: () => import('@/pages/giftList'),
    meta: {
      requiresAuth: true
    },
  },
  //礼物信息
  {
    path: '//gift/info/:id',
    component: () => import('@/pages/giftInfo'),
    meta: {
      requiresAuth: true
    },
  },
  //礼物信息详情
  {
    path: '//gift/infoDetail/:id',
    component: () => import('@/pages/giftInfoDetail'),
    meta: {
      requiresAuth: true
    }
  },
  //礼物订单详情
  {
    path: '//gift/detail/:id',
    component: () => import('@/pages/giftDetail'),
    meta: {
      requiresAuth: true
    }
  },
  //读取文章
  {
    path: '//article/detail',
    component: () => import('@/pages/articleDetail')
  },
  // 读取文章列表
  {
    path: '//article/list',
    component: () => import('@/pages/articleList')
  },
  {
    //收益
    path: "/win_a/profit",
    component: () => import("@/pages/win_a/profit"),
    meta: {
      requiresAuth: true
    }
  },
  {
    //欢迎页
    path: "/welcome",
    component: () => import("@/pages/welcome")
  }, {
    //扫码
    path: "/barCode",
    component: () => import("@/pages/barCode")
  },
  {
    //接收礼物
    path: "//ucenter/gifts/GetGiftsDetail",
    component: () => import("@/pages/ucenterGetGiftsDetail")
  },
  
]
