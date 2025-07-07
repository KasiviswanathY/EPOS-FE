'use client';

import React from 'react';
import Link from 'next/link';
import Table from '@/core/common/pagination/datatable'; 
import CommonFooter from '@/core/common/footer/commonFooter';

const SalesByTenderPage = () => {
  const columns = [
    { title: 'Tender', dataIndex: 'tender' },
    { title: 'Transaction Qty', dataIndex: 'transactionQty' },
    { title: 'Average Transaction Total', dataIndex: 'avgTransactionTotal' },
    { title: 'Tender Qty', dataIndex: 'tenderQty' },
    { title: 'Average Tender Total', dataIndex: 'avgTenderTotal' },
    { title: 'Total', dataIndex: 'total' },
    { title: '% of Turnover', dataIndex: 'turnoverPercent' },
  ];

  const dataSource = [
    {
      key: '1',
      tender: 'Cash',
      transactionQty: 692,
      avgTransactionTotal: '$10.56',
      tenderQty: 694,
      avgTenderTotal: '$10.53',
      total: '$7,309.04',
      turnoverPercent: '57.25 %',
    },
    {
      key: '2',
      tender: 'CC/FS',
      transactionQty: 280,
      avgTransactionTotal: '$18.29',
      tenderQty: 280,
      avgTenderTotal: '$18.29',
      total: '$5,121.99',
      turnoverPercent: '40.12 %',
    },
    {
      key: '3',
      tender: 'House Account',
      transactionQty: 10,
      avgTransactionTotal: '$33.55',
      tenderQty: 10,
      avgTenderTotal: '$33.55',
      total: '$335.46',
      turnoverPercent: '2.63 %',
    },
    {
      key: '4',
      tender: 'CC/FS',
      transactionQty: 280,
      avgTransactionTotal: '$18.29',
      tenderQty: 280,
      avgTenderTotal: '$18.29',
      total: '$5,121.99',
      turnoverPercent: '40.12 %',
    },
    {
      key: '5',
      tender: 'Cash',
      transactionQty: 692,
      avgTransactionTotal: '$10.56',
      tenderQty: 694,
      avgTenderTotal: '$10.53',
      total: '$7,309.04',
      turnoverPercent: '57.25 %',
    },
    {
      key: 'total',
      tender: <strong>Total:</strong>,
      transactionQty: 982,
      avgTransactionTotal: <strong>$13.00</strong>,
      tenderQty: 984,
      avgTenderTotal: <strong>$12.97</strong>,
      total: <strong>$12,766.49</strong>,
      turnoverPercent: <strong>100.00 %</strong>,
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4 className="fw-bold">Sales By Tender</h4>
          </div>
        </div>
        
        <div className="filter-section d-flex flex-wrap gap-3 mb-4">
          <div className="flex-grow-1">
            <label className="form-label">Show data from</label>
            <select className="form-select">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This Month</option>
              <option>Custom</option>
            </select>
            <div className="text-muted small mt-1">25 Jun 2025 - 01 Jul 2025</div>
          </div>

          <div className="flex-grow-1">
            <label className="form-label">Filter by Location</label>
            <select className="form-select">
              <option>All Locations</option>
            </select>
          </div>

          <div className="flex-grow-1">
            <label className="form-label">Filter by Device</label>
            <select className="form-select">
              <option>All Devices</option>
            </select>
          </div>

          
        </div>
        <div className="mb-3 d-flex flex-wrap justify-content-between align-items-center">
        <div className="d-flex flex-wrap gap-2">
        <button className="btn btn-outline-primary">EXPORT TO .CSV</button>
        <button className="btn btn-outline-primary">EXPORT TO WORD</button>
        <button className="btn btn-outline-primary">EXPORT TO EXCEL</button>
        <button className="btn btn-outline-primary">PRINT</button>
        </div>
       <div className="d-flex gap-2 mt-2 mt-md-0">
       <button className="btn btn-outline-primary">RESET</button>
       <button className="btn btn-primary">APPLY</button>
      </div>
      </div>
        <div className="card table-list-card">
          <div className="card-body">
            <div className="table-responsive">
              <Table columns={columns} dataSource={dataSource} />
            </div>
          </div>
        </div>
      </div>

      <CommonFooter />
    </div>
  );
};

export default SalesByTenderPage;
