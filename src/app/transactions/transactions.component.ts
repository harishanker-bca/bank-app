import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  allTransactions: any = []
  serchKey: string = ""
  constructor(private api: ApiService, private toaster: ToasterService) { }
  ngOnInit(): void {
    this.getTransactions()
  }

  getTransactions() {
    this.api.getTransations().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allTransactions = res
      },
      error: (err: any) => {
        this.toaster.showError(err.error, "failed")

      }
    })
  }
  generatePDF() {
    let pdf = new jspdf()
    // pdf.autoPrint()
    // let title_row = ['Type', 'Debit Account', 'Credit Account', 'Amount']
    // let table_body: any = []
    // pdf.setFontSize(16)
    // pdf.text("Mini Statement", 10, 10)
    // pdf.setFontSize(12)
    // for (let element of this.allTransactions) {
    //   let temp = [element.transaction_type, element.fromAcno, element.toAcno, element.amount]
    //   table_body.push(temp)
    // }

    // autoTable(pdf, {
    //   head: [title_row],
    //   body: table_body
    // })
    autoTable(pdf,{html:'#transactionTable'})

    pdf.output('dataurlnewwindow')
    pdf.save('miniStatement.pdf')

  }
}
