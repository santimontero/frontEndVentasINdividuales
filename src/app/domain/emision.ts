export class Emision {
  cotizacion: Cotizacion;
  cliente: Cliente;
  clienteDomicilio: ClienteDomicilio;
  financiero: Financiero;
  formaPago: FormaPago;
  beneficiarios: Beneficiarios[];
  comercializacion: ConfiguraComercializacion;
}

export class Financiero {
  tit_cuenta?: any;
  tip_ident?: any;
  ident_tit?: any;
  nom_tit?: any;
  paren_tit?: any;
  ran_ingreso?: any;
  med_ingreso?: any;
  ran_patrimonio?: any;
  med_patrimonio?: any;
  ocupa?: any;
  act_eco?: any;
}

export class Cotizacion {
  prima?: any;
  suma_aseg?: any;
  fren_pago?: any;
  coberturas?: any;
  pda_codigo_canal_subc?: any;
  pda_codigo_conf_prd?: any;
  pda_codigo_plan?: any;
  pda_descrip_conf_prod?: any;
  pda_num_identifica_asesor?: any;
  pda_ramo?: any;
  pda_solicita_intermediario?: any;
  pda_tipo_asesor?: any;
}

export class Cliente {
  tipo_identificacion?: any;
  identificacion?: any;
  primer_nombre?: any;
  segundo_nombre?: any;
  primer_apellido?: any;
  segundo_apellido?: any;
  genero?: any;
  estado_civil?: any;
  fecha_nacimiento?: any;
  edad?: any;

  estado_migratorio?: any;
  Fecha_Expedicion_Pasp?: any;
  Fecha_Ingreso_Pais?: any;
  Fecha_Caducidad_Pasp?: any;
}
export class FormaPago {
  tipo_form_pago?: any;
  banco?: any;
  numero?: any;
  tipo_tarjeta?: any;
  pais_emisor?: any;
  ano_caducidad?: any;
  mes_caducidad?: any;
  cvv?: any;
}
export class Beneficiarios {
  tipo_identificacion?: any;
  identificacion?: any;
  primer_nombre?: any;
  segundo_nombre?: any;
  primer_apellido?: any;
  segundo_apellido?: any;
  genero?: any;
  fecha_nacimiento?: any;
  edad?: any;
  participacion?: any;

}
export class ClienteDomicilio {
  pais_origen?: any;
  nacionalidad?: any;
  nomb_familiar?: any;
  telef_familiar?: any;
  email?: any;
  envio_cor?: any;
  provincia_dom?: any;
  ciudad_dom?: any;
  calle_prin_dom?: any;
  num_dom?: any;
  trasv_dom?: any;
  refe_dom?: any;
  barrio_dom?: any;
  tel_dom?: any;
  cel_dom?: any;
  hora_desde_dom?: any;
  hora_hasta_dom?: any;
  provincia_trab?: any;
  ciudad_trab?: any;
  calle_prin_trab?: any;
  num_trab?: any;
  trasv_trab?: any;
  barrio_trab?: any;
  refe_trab?: any;
  local_trab?: any;
  piso_trab?: any;
  tel_trab?: any;
  ext_trab?: any;
  nom_empresa?: any;
  hora_desde_trab?: any;
  hora_hasta_trab?: any;

}

export class ConfiguraComercializacion{
  prd_ramo: any;
  prd_codigo: any;
  cfc_prima_comercializacion?: any; 
  cfc_limite?: any; 
  cfc_codigo_estructura?: any;
  cfc_porcentaje_estructura?: any;
  cfc_cerrado_abierto: any;
  cfc_item_cod: any;
  cfc_numero_meses?: any;
  cfc_valor_rda?: any;
  cfc_plurianual: any;
  cfc_ingbenef: any; 
  cfc_formapago?: any;
  cfc_imprimirtodascoberturas: any;
  cfc_tipodnegocio: any;
  cfc_ctarembolso: any;
  cfc_valida_beneficiario: any;
  cfc_configuracion_maestra: any;
  cfc_calular_comision: any;
  cfc_cod_banco: any;
  cfc_homologarcobertura: any; 
  cfc_declaracion_salud: any; 
  cfc_validadependiente_declaracion_salud: any;
  cfc_valida_suma_asegurada: any;
  cfc_valida_fechanacimiento_dependiente: any; 
  cfc_tipoventa: any;
  cfc_ruc_institucion_educativa: any;
  cfc_modificabienasegurado: any;
  cfc_flag_item: any; 
}