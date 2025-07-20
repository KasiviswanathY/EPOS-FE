export const SidebarData1 = [
  {
    title: 'Main Menu',
    hasSubRoute: true,
    icon: 'layout-grid',
    showSubRoute: false,
    route: "/index",
    subRoutes: [
      {
        title: 'Dashboard',
        hasSubRoute: true,
        showSubRoute: true,
        subRoutes: [
          {
            title: 'Admin Dashboard',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/index",
            subRoutes: [],
          },
          {
            title: 'Sales Dashboard',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/sales-dashboard",
            subRoutes: [],
          },
        ],
      },
      {
        title: 'Layouts',
        hasSubRoute: true,
        icon: 'layout-sidebar-right-collapse',
        showSubRoute: false,
        subRoutes: [
          {
            title: 'Horizontal',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/layout-horizontal",
            subRoutes: [],
          },
          {
            title: 'Detached',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/layout-detached",
            subRoutes: [],
          },
          {
            title: 'Modern',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/layout-modern",
            subRoutes: [],
          },
          {
            title: 'Two Column',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/layout-two-column",
            subRoutes: [],
          },
          {
            title: 'Hovered',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/layout-hovered",
            subRoutes: [],
          },
          {
            title: 'Boxed',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/layout-boxed",
            subRoutes: [],
          },
          {
            title: 'RTL',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/layout-rtl",
            subRoutes: [],
          },
          {
            title: 'Dark',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/layout-dark",
            subRoutes: [],
          },
        ],
      },
    ],
  },
  {
    title: 'Inventory',
    hasSubRoute: true,
    icon: 'brand-unity',
    showSubRoute: false,
    activeRoute: 'product',
    subRoutes: [
      {
        title: 'Product-view',
        hasSubRoute: false,
        showSubRoute: true,
        route: "/product-view",
        subRoutes: [],
      },
      {
        title: 'Products',
        hasSubRoute: false,
        showSubRoute: true,
        route: "/product-list",
        subRoutes: [],
      },
      {
        title: 'Create Product',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/add-product",
        subRoutes: [],
      },
      {
        title: 'Expired Products',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/expired-products",
        subRoutes: [],
      },
      {
        title: 'Low Stocks',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/low-stocks",
        subRoutes: [],
      },
      {
        title: 'Category',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/category-list",
        subRoutes: [],
      },
      {
        title: 'Sub Category',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/sub-categories",
        subRoutes: [],
      },
      {
        title: 'Brands',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/brand-list",
        subRoutes: [],
      },
            {
        title: 'popup alert',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/pop-up-alert",
        subRoutes: [],
      },
      {
        title: 'Buying Review',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/buying-review",
        subRoutes: [],
      },
      {

        title: 'Promotion List',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/promotion-list",
        subRoutes: [],
      },
      
      {
        title: 'Units',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/units",
        subRoutes: [],
      },
      {
        title: 'Variant Attributes',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/variant-attributes",
        subRoutes: [],
      },
      {
        title: 'Warranties',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/warranty",
        subRoutes: [],
      },
      {
        title: 'Print Barcode',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/barcode",
        subRoutes: [],
      },
      {
        title: 'Print QR Code',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/qrcode",
        subRoutes: [],
      },
    ],
  },
  {
    title: 'Company',
    hasSubRoute: true,
    icon: 'building',
    showSubRoute: false,
    activeRoute: 'companydetails',
    subRoutes: [
      {
        title: 'company details',
        hasSubRoute: false,
        showSubRoute: true,
        route: "/company-details",
        subRoutes: [],
      },
      {
        title: 'customer types',
        hasSubRoute: false,
        showSubRoute: true,
        route: "/customer-types",
      },
      {
        title: 'clocking types',
        hasSubRoute: false,
        showSubRoute: true,
        route: "/clocking-types",
      },
      {
        title: 'Stock Movement Reasons',
        hasSubRoute: false,
        showSubRoute: true,
        route: "/stock-movement-reasons",
      },
        {
        title: 'no sale reason',
        hasSubRoute: false,
        showSubRoute: true,
        route: "/no-sale-reason",
        },

      {

        title: 'refund reasons',
        hasSubRoute: false,
        showSubRoute: true,
        route: "/refund-reasons",
      },
{

        title: 'discount reasons',
        hasSubRoute: false,
        showSubRoute: true,
        route: "/discount-reasons",
},
{
        title: 'Receipts',
        hasSubRoute: false,
        showSubRoute: true,
        route: "/receipts",

        subRoutes: [],
      },
    ],
  },

  {
        title: 'Locationslist',
        hasSubRoute: true,
        showSubRoute: false,
        route: "/locations-list",
        subRoutes: [
          {
            title: 'Locationslist',
            hasSubRoute: true,
            showSubRoute: true,
            subRoutes: [
              {
                title: 'Locations List',
                hasSubRoute: false,
                showSubRoute: false,
                route: "/locations-list",
                subRoutes: [],
              },
              {
                title: 'Devices List',
                hasSubRoute: false,
                showSubRoute: false,
                route: "/Devices-list",
                subRoutes: [],
              },
              {
                title: 'Opening Hours',
                hasSubRoute: false,
                showSubRoute: false,
                route: "/opening-hours",
                subRoutes: [],
              },
            ],
          },
        ],
      },

  {
    title: 'Sales & Purchase',
    hasSubRoute: true,
    icon: 'layout-grid',
    showSubRoute: false,
    activeRoute: 'users',
    subRoutes: [
      {
        title: 'Stock',
        hasSubRoute: true,
        showSubRoute: false,
        subRoutes: [
          {
            title: 'Manage Stock',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/manage-stocks",
            subRoutes: [],
          },
          {

            title: 'Stock Takes',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/stock-takes",
            subRoutes: [],
          },
          {
            title: 'Stock Movements',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/stock-movements",
            subRoutes: [],
          },
           {
            title: 'Stock Disparencies',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/stock-disparencies",
            subRoutes: [],
          },
          {
            title: 'Stock Adjustment',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/stock-adjustment",
            subRoutes: [],
          },
          {
            title: 'Stock Transfer',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/stock-transfer",
            subRoutes: [],
          },
          {

            title: 'Stock Audit History',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/stock-audit-history",
            subRoutes: [],

          },
          {
            title: 'Stock Level',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/stock-level",
            subRoutes: [],
          },
          {
            title: 'Non-Selling Stocks',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/non-selling-stocks",
            subRoutes: [],
          },
          {

            title: 'Stock Warnings',

            hasSubRoute: false,
            showSubRoute: false,
            route: "/stock-warnings",
            subRoutes: [],
          },
        ],
      },
      {
        title: 'Sales',
        hasSubRoute: true,
        showSubRoute: false,
        route: "/sales-list",
        subRoutes: [
          {
            title: 'Sales',
            hasSubRoute: true,
            showSubRoute: true,
            subRoutes: [
              {
                title: 'Online Orders',
                hasSubRoute: false,
                showSubRoute: false,
                route: "/online-orders",
                subRoutes: [],
              },
              {
                title: 'POS Orders',
                hasSubRoute: false,
                showSubRoute: false,
                route: "/pos-orders",
                subRoutes: [],
              },
            ],
          },
        ],
      },
      {
        title: 'Promo',
        hasSubRoute: true,
        showSubRoute: false,
        activeRoute: 'promo',
        subRoutes: [
          {
            title: 'Generate Labels',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/generate-labels",
            subRoutes: [],
          },
          {
            title: 'Coupons',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/coupons",
            subRoutes: [],
          },
          {
            title: 'Gift Cards',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/gift-cards",
            subRoutes: [],
          },
          {
            title: 'Discount',
            hasSubRoute: true,
            showSubRoute: true,
            subRoutes: [
              {
                title: 'Discount Plan',
                hasSubRoute: false,
                showSubRoute: false,
                route: "/discount-plan",
                subRoutes: [],
              },
              {
                title: 'Discount',
                hasSubRoute: false,
                showSubRoute: false,
                route: "/discount",
                subRoutes: [],
              },
            ],
          },
        ],
      },
      {
        title: 'Purchases',
        hasSubRoute: true,
        showSubRoute: false,
        activeRoute: 'users',
        subRoutes: [
          {
            title: 'Purchases',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/purchase-list",
            subRoutes: [],
          },
          {
            title: 'Purchase Order',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/purchase-order-report",
            subRoutes: [],
          },
          {
            title: 'Purchase Return',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/purchase-returns",
            subRoutes: [],
          },
          {
            title: 'Expenses',
            hasSubRoute: true,
            showSubRoute: true,
            subRoutes: [
              {
                title: 'Expenses',
                route: "/expense-list",
                hasSubRoute: false,
                showSubRoute: false,
                subRoutes: [],
              },
              {
                title: 'Expense Category',
                route: "/expense-category",
                hasSubRoute: false,
                showSubRoute: false,
                subRoutes: [],
              },
            ],
          },
        ],
      },
      {
        title: 'Expenses',
        hasSubRoute: true,
        showSubRoute: true,
        subRoutes: [
          {
            title: 'Expenses',
            route: "/expense-list",
            hasSubRoute: false,
            showSubRoute: false,
            subRoutes: [],
          },
          {
            title: 'Expense Category',
            route: "/expense-category",
            hasSubRoute: false,
            showSubRoute: false,
            subRoutes: [],
          },
        ],
      },
      {
        title: 'Income',
        hasSubRoute: true,
        showSubRoute: false,
        route: "/purchase-returns",
        subRoutes: [
          {
            title: 'Income',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/income",
            subRoutes: [],
          },
          {
            title: 'Income Category',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/income-category",
            subRoutes: [],
          },
        ],
      },
      {
    title: 'Banking',
    hasSubRoute: true,
    showSubRoute: false,
    subRoutes: [
      {
        title: 'End Of Day Report',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/end-of-day-report",
        subRoutes: [],
      },
    
      {

        title: 'Float Adjustment Report',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/float-adjustment-report",
        subRoutes: [],
      },
        {
        title: 'Payouts Report',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/payouts-report",
        subRoutes: [],
      },
      {
        title: 'Petty Cash Report',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/petty-cash-report",
        subRoutes: [],
      },
      {
        title: 'Integrated Card Types Report',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/integrated-card-types-report",
        subRoutes: [],
      },
    ],
  },

      {
    title: 'Accounting',
    hasSubRoute: true,
    icon: 'books',
    showSubRoute: false,
    subRoutes: [
      {
        title: 'Book keeping',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/book-keeping",
        subRoutes: [],
      },
      {

        title: 'Payroll Report',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/payroll-report",
      },
      {

        title: 'End-Of-Year-Tax-Report',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/end-of-year-tax-report",
      },
      {

        title: 'Quarterly Tax Report',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/quarterly-tax-report",
      },
      {

        title: 'Monthly Tax-Report',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/monthly-tax-report",
      },
      {
        title: 'Daily Tax Report',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/daily-tax-report",
       subRoutes: [],
      },
    ],
  },
      {
        title: 'Tender Types',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/tender-types",
        subRoutes: [],
      },
       {
        title: 'Tax Rates',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/tax-rates",
        subRoutes: [],
      },
      {
        title: 'Petty Cash Reasons',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/petty-cash-reasons",
        subRoutes: [],
      },
      {
        title: 'Pay Out Reasons',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/pay-out-reasons",
        subRoutes: [],
      },
      {
        title: 'Additional Logins',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/additional-logins",
        subRoutes: [],
      },
      {

        title: 'Restore Data',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/restoredata",
        subRoutes: [],
      },
      {
        title: 'Cloud Sync',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/cloud-sync",
        subRoutes: [],
      },
      {
        title: 'transaction reports',
        hasSubRoute: true,
        showSubRoute: false,
        route: "/transactions",
        subRoutes: [
          {
            title: 'Transactions',
            hasSubRoute: true,
            showSubRoute: true,
            subRoutes: [],
           
          },
          {
            title: 'Held Transactions',
            hasSubRoute: true,
            showSubRoute: true,
            subRoutes: [],
           
          },
        ],
      },

      {
        title: 'All Transactions',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/all-transactions",
        subRoutes: [],
      },
      
      {
        title: 'Money Transfer',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/money-transfer",
        subRoutes: [],
      },
      {
        title: 'Balance Sheet',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/balance-sheet",
        subRoutes: [],
      },
      {
        title: 'Trial Balance',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/trial-balance",
        subRoutes: [],
      },
      {
        title: 'Cash Flow',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/cash-flow",
        subRoutes: [],
      },
      {
        title: 'Account Statement',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/account-statement",
        subRoutes: [],
      }
    ],
  },
  {
    title: 'HRM',
    hasSubRoute: true,
    icon: 'users',
    showSubRoute: false,
    subRoutes: [
      {
        title: 'Employees',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/employees-grid",
        subRoutes: [],
      },
      {
        title: 'Designations',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/designation",
        subRoutes: [],
      },
      {
        title: 'Departments',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/department-grid",
        subRoutes: [],
      },
      {
        title: 'Shifts',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/shift",
        subRoutes: [],
      },
      {
        title: 'Attendance',
        hasSubRoute: true,
        showSubRoute: false,
        route: "/attendance",
        subRoutes: [
          {
            title: 'Employee Attendance',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/attendance-employee",
            subRoutes: [],
          },
          {
            title: 'Admin Attendance',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/attendance-admin",
            subRoutes: [],
          },
        ],
      },
      {
        title: 'Leave & Holidays',
        hasSubRoute: true,
        showSubRoute: false,
        route: "/leave-holidays",
        subRoutes: [
          {
            title: 'Admin Leaves',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/leaves-admin",
            subRoutes: [],
          },
          {
            title: 'Employee Leaves',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/leaves-employee",
            subRoutes: [],
          },
          {
            title: 'Leave Types',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/leave-types",
            subRoutes: [],
          },
          {
            title: 'Holidays',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/holidays",
            subRoutes: [],
          },
          {
            title: 'Payroll',
            hasSubRoute: true,
            showSubRoute: true,
            route: "/employee-salary",
            subRoutes: [
              {
                title: 'Employee Salary',
                hasSubRoute: false,
                showSubRoute: false,
                route: "/employee-salary",
                subRoutes: [],
              },
              {
                title: 'Payslip',
                hasSubRoute: false,
                showSubRoute: false,
                route: "/payslip",
                subRoutes: [],
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Settings',
    hasSubRoute: true,
    icon: 'settings',
    showSubRoute: false,
    activeRoute: 'users',
    subRoutes: [
      {
        title: 'General Settings',
        hasSubRoute: true,
        showSubRoute: false,
        subRoutes: [
          {
            title: 'Profile',
            route: "/profile",
            hasSubRoute: false,
            showSubRoute: false,
          },
          {
            title: 'Security',
            route: "/security-settings",
            hasSubRoute: false,
            showSubRoute: false,
          },
          {
            title: 'Notifications',
            route: "/notification",
            hasSubRoute: false,
            showSubRoute: false,
          },
          {
            title: 'Connected Apps',
            route: "/connected-apps",
            hasSubRoute: false,
            showSubRoute: false,
          },
        ],
      },
      {
        title: 'Website Settings',
        hasSubRoute: true,
        showSubRoute: false,
        subRoutes: [
          {
            title: 'System Settings',
            route: "/system-settings",
            hasSubRoute: false,
            showSubRoute: false,
          },
          {
            title: 'Company Settings',
            route: "/company-settings",
            hasSubRoute: false,
            showSubRoute: false,
          },
          {
            title: 'Localization',
            route: "/localization-settings",
            hasSubRoute: false,
            showSubRoute: false,
          },
          {
            title: 'Prefixes',
            route: "/prefixes",
            hasSubRoute: false,
            showSubRoute: false,
          },
          {
            title: 'Preference',
            route: "/preference",
            hasSubRoute: false,
            showSubRoute: false,
          },
          {
            title: 'Appearance',
            route: "/appearance",
            hasSubRoute: false,
            showSubRoute: false,
          },
          {
            title: 'Social Authentication',
            route: "/social-authentication",
            hasSubRoute: false,
            showSubRoute: false,
          },
          {
            title: 'Language',
            route: "/language-settings",
            hasSubRoute: false,
            showSubRoute: false,
          },
        ],
      },
      {
        title: 'App Settings',
        hasSubRoute: true,
        showSubRoute: false,
        activeRoute: 'users',
        subRoutes: [
          {
            title: 'Invoice',
            hasSubRoute: true,
            showSubRoute: true,
            subRoutes: [
              {
                title: 'Invoice Settings',
                route: "/invoice-settings",
                hasSubRoute: true,
                showSubRoute: true,
                subRoutes: [],
              },
              {
                title: 'Invoice Template',
                route: "/invoice-template",
                hasSubRoute: true,
                showSubRoute: true,
                subRoutes: [],
              },
            ],
          },
          {
            title: 'Printer',
            route: "/printer-settings",
            hasSubRoute: false,
            showSubRoute: false,
          },
          {
            title: 'POS',
            route: "/pos-settings",
            hasSubRoute: false,
            showSubRoute: false,
          },
          {
            title: 'Custom Fields',
            route: "/custom-fields",
            hasSubRoute: false,
            showSubRoute: false,
          },
        ],
      },
      {
        title: 'System Settings',
        hasSubRoute: true,
        showSubRoute: false,
        activeRoute: 'users',
        subRoutes: [
          {
            title: 'Email',
            hasSubRoute: true,
            showSubRoute: true,
            subRoutes: [
              {
                title: 'Email Settings',
                route: "/email-settings",
                hasSubRoute: false,
                showSubRoute: false,
              },
              {
                title: 'Email Template',
                route: "/email-template",
                hasSubRoute: false,
                showSubRoute: false,
              },
            ],
          },
          {
            title: 'SMS',
            hasSubRoute: true,
            showSubRoute: true,
            subRoutes: [
              {
                title: 'SMS Settings',
                route: "/sms-settings",
                hasSubRoute: false,
                showSubRoute: false,
              },
              {
                title: 'SMS Template',
                route: "/sms-template",
                hasSubRoute: false,
                showSubRoute: false,
              },
            ]
          },
          {
            title: 'OTP',
            route: "/otp-settings",
            hasSubRoute: false,
            showSubRoute: false,
          },
          {
            title: 'GDPR Cookies',
            route: "/gdpr-settings",
            hasSubRoute: false,
            showSubRoute: false,
          },
        ],
      },
      {
        title: 'Financial Settings',
        hasSubRoute: true,
        showSubRoute: false,
        activeRoute: 'users',
        subRoutes: [
          {
            title: 'Payment Gateway',
            route: "/payment-gateway-settings",
            hasSubRoute: false,
            showSubRoute: false,
          },
          {
            title: 'Bank Accounts',
            route: "/bank-settings-grid",
            hasSubRoute: false,
            showSubRoute: false,
          },
          {
            title: 'Tax Rates',
            route: "/tax-rates",
            hasSubRoute: false,
            showSubRoute: false,
          },
          {
            title: 'Currencies',
            route: "/currency-settings",
            hasSubRoute: false,
            showSubRoute: false,
          },
        ],
      },
      {
        title: 'Other Settings',
        hasSubRoute: true,
        showSubRoute: false,
        activeRoute: 'users',
        subRoutes: [
          {
            title: 'Storage',
            route: "/storage-settings",
            hasSubRoute: false,
            showSubRoute: false,
          },
          {
            title: 'Ban IP Address',
            route: "/ban-ip-address",
            hasSubRoute: false,
            showSubRoute: false,
          },
        ],
      },
      {
        title: 'Logout',
        route: "/signin",
      }
    ],
  },
  {
    title: 'More',
    hasSubRoute: true,
    icon: 'circle-plus',
    showSubRoute: false,
    activeRoute: 'More',
    subRoutes: [
      {
        title: 'People',
        hasSubRoute: true,
        showSubRoute: false,
        subRoutes: [
          {
            title: 'Customers',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/customers",
            subRoutes: [],
          },
           {
            title: 'Customer Reports',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/customer-reports",
            subRoutes: [],
          },
          {
            title: 'Invoice Messages',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/invoice messages",
            subRoutes: [],
          },
          {
            title: 'Billers',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/billers",
            subRoutes: [],
          },
          {
            title: 'Hours',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/hours",
            subRoutes: [],
          },
          {
            title: 'Suppliers',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/suppliers",
            subRoutes: [],
          },
          {
            title: 'Stores',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/store-list",
            subRoutes: [],
          },
          {
            title: 'Warehouses',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/warehouse",
            subRoutes: [],
          },
        ],
      },
      {
        title: 'User Management',
        hasSubRoute: true,
        showSubRoute: false,
        subRoutes: [
          {
            title: 'Users',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/users",
            subRoutes: [],
          },
          {
            title: 'Roles & Permissions',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/roles-permissions",
            subRoutes: [],
          },
          {
            title: 'Delete Account Request',
            hasSubRoute: false,
            showSubRoute: false,
            route: "/delete-account",
            subRoutes: [],
          },
        ],
      },
      {
        title: 'Documentation',
        hasSubRoute: false,
        showSubRoute: false,
        activeRoute: 'users',
      },
      {
        title: 'Changelog v2.0.7',
        hasSubRoute: false,
        showSubRoute: false,
        activeRoute: 'users',
      }
    ]
  }
];
