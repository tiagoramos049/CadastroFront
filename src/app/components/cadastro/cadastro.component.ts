import { Component, OnInit, TemplateRef } from '@angular/core';
import { CadastroService } from '../../cadastro.service';
import { Cadastro } from '../../Cadastro';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {

  constructor(private cadastroService: CadastroService,
      private modalService: BsModalService
  ) { }

  formulario : any;
  tituloFormulario: string | undefined;
  cadastros : Cadastro[] | undefined;

  nomeCadastro : string = "";
  cadastroId: number = 0;
  modalRef: BsModalRef | undefined;

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;
  
  ngOnInit(): void{
    this.cadastroService.PegarTodos().subscribe(data =>{
      this.cadastros = data
    });
    this.tituloFormulario = "Novo Cadastro";
    this.formulario = new FormGroup({
      nomeCompleto: new FormControl(null),
      dataNascimento: new FormControl(null),
      valorRenda: new FormControl(null),
      cpf: new FormControl(null)
    });
  }

  ExibirFormularioCadastro(): void{

    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = "Novo Cadastro";
    this.formulario = new FormGroup({
      nomeCompleto: new FormControl(null),
      dataNascimento: new FormControl(null),
      valorRenda: new FormControl(null),
      cpf: new FormControl(null)
    });
  }

  ExibirFormularioAtualizacao(cadastroId: number) : void{
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.cadastroService.PegarPorId(cadastroId).subscribe(resultado => {
      this.tituloFormulario = `Atualiza ${resultado.nomeCompleto}`;
      this.formulario = new FormGroup({
        cadastroId: new FormControl(resultado.cadastroId),
        nomeCompleto: new FormControl(resultado.nomeCompleto),
        dataNascimento: new FormControl(resultado.dataNascimento),
        valorRenda: new FormControl(resultado.valorRenda),
        cpf: new FormControl(resultado.cpf),
      });
    });
  }

  EnviarFormulario(): void{
    const cadastro : Cadastro = this.formulario.value;
    if(cadastro.cadastroId > 0){
      this.cadastroService.AtualizarPessoa(cadastro).subscribe(resultado => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Cadastro alterada com sucesso');
        this.cadastroService.PegarTodos().subscribe(registros => {
          this.cadastros = registros;
        });
      });
    }else{
      this.cadastroService.SalvarPessoa(cadastro).subscribe(resultado => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Cadastro inserido com sucesso');
        this.cadastroService.PegarTodos().subscribe(registros => {
          this.cadastros = registros;
        });
      });
    }
  }

  Voltar():void{
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  ExibirConfirmacaoExclusao(cadastroId: number, nomeCadastro: string, conteudoModal: TemplateRef<any>): void{
    this.modalRef = this.modalService.show(conteudoModal);
    this.cadastroId = cadastroId;
    this.nomeCadastro = nomeCadastro;
  }

  ExcluirCadastro(cadastroId: number){
    this.cadastroService.ExcluirCadastro(cadastroId).subscribe(resultado => {
      this.modalRef?.hide();
      alert('Cadastro excluído com sucesso');
      this.cadastroService.PegarTodos().subscribe(registros => {
        this.cadastros = registros;
      });
    });
  }
}
