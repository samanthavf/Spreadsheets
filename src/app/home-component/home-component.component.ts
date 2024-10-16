import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Cell } from './cell';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {
apresentacao:boolean = true;
tabela:boolean=false;
rows: Cell [][]= [[{value:''}]];

addRow() {
  const newRow = this.rows[0].map(() => ({ value: '' }));
  this.rows.push(newRow);
}


addColumn() {
  this.rows.forEach(row => row.push({ value: '' }));
}


removeRow() {
  if (this.rows.length > 1) {
    this.rows.pop();
  }
}


removeColumn() {
  if (this.rows[0].length > 1) {
    this.rows.forEach(row => row.pop());
  }
}

planilhas() {
  this.apresentacao = false;
  this.tabela = true;
  }

  Salvar(){
    const tabelaData = this.rows.map(row => row.map(cell => cell.value));
    localStorage.setItem('tabelaData', JSON.stringify(tabelaData));
    alert('Planilha salva')
    console.log('Dados salvos no localStorage:', tabelaData);
  }

  downloadPDF() {
    const doc = new jsPDF();
    const table = document.querySelector('.container-tabela');
    if (table) {
      const tempTable = table.querySelector('table');

      if (tempTable) {
        doc.autoTable({ html: tempTable });
        doc.save('planilha.pdf');
      }
    }
  }
}
