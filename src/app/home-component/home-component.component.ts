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
    const tabelaData: string[][] = this.rows.map((row: Cell[]) =>
    row.map((cell: Cell) => cell.value)
  );
  localStorage.setItem('tabelaData', JSON.stringify(tabelaData));
  alert('Planilha salva');
  console.log('Dados salvos no localStorage:', tabelaData);
  }

  downloadPDF() {
    const doc = new jsPDF();
    const tabelaData = localStorage.getItem('tabelaData');
    if (tabelaData) {
      const rows: string[][] = JSON.parse(tabelaData);
      const formattedData = rows.map((row: string[]) =>
        row.map((cell: string) => cell || '')
      );
  
      doc.autoTable({
        head: [formattedData[0]], // Cabeçalho da tabela (primeira linha)
        body: formattedData.slice(1), // Corpo da tabela (resto das linhas)
      });
      doc.save('planilha.pdf');
    } else {
      console.error('Nenhuma tabela encontrada no localStorage.');
    }
    }
  }

