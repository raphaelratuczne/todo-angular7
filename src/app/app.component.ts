import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public campo = '';
  public editando = null;

  constructor(public dialog: MatDialog) { }

  public lista = [
    { texto: 'Teste de item', feito: false },
    { texto: 'Essa lista não salva', feito: true },
    { texto: 'Se apertar F5, já elvis...', feito: false }
  ];

  public salvar() {
    if (this.editando !== null) {
      this.lista[this.editando].texto = this.campo;
      this.editando = null;
    } else {
      this.lista.push({ texto: this.campo , feito: false });
    }
    this.campo = '';
  }

  public editar(i:number) {
    this.editando = i;
    this.campo = this.lista[i].texto;
  }

  openDialog(index:number): void {
    let dialogRef = this.dialog.open(DialogConfirmacao, {
      width: '250px',
      data: { i:index }
    });

    dialogRef.afterClosed().subscribe((result:number) => {
      if(result >= 0) {
        this.excluir(result);
      }
    });
  }

  public excluir(i:number) {
    this.lista.splice(i,1);
  }
}


@Component({
  selector: 'dialog-confirmacao',
  template: `
    <h2 mat-dialog-title>Confirmar exclusão</h2>
    <mat-dialog-content>Tem certeza que deseja ecluir?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="-1">Cancelar</button>
      <button mat-button [mat-dialog-close]="data.i">Confirmar</button>
    </mat-dialog-actions>
  `
})
export class DialogConfirmacao {

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmacao>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  fechar(i:number): void {
    this.dialogRef.close(i);
  }

}
