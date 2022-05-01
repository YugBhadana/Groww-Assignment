import React from 'react'
import "./bankdetails.css";
import { useLocation, Redirect } from 'react-router-dom'
import { detailsMap } from '../../utils'

function BankDetailPage() {
  const { state } = useLocation()
  const { bank } = state ?? {}

  if(!bank) {
    return <Redirect to='/all-banks' />
  }

  return (
    <div className="card-wrapper">
      <div className="card-header-details"> {bank.bank_name} </div>
      <div className="card-content">
        {
          detailsMap.map(detail => (
            <div className="card-content-row">
              <div> {detail} </div>
              <div> {bank[detail]} </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default BankDetailPage

// {JSON.stringify(bank)}