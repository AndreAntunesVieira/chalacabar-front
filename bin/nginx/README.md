
## Path dos arquivos

cert.conf deve estar na pasta: /etc/nginx/

default.conf deve estar na pasta /etc/nginx/sites-available/ com link em /etc/nginx/sites-enabled/


## Gerar/Renovar certificado SSL

Novo certificado:

```bash
sudo certbot -d *.chalacabar.com.br -d chalacabar.com.br --manual --preferred-challenges dns certonly
```

Siga as instruções indicadas no terminal

Para renovar basta:

```bash
sudo certbot renew
```

**Provável** instruções a serem seguidas:
Mostrará um valor TXT para adicionar ao DNS, então vá ao painel da AWS, ferramenta de [DNS (Route 53)](https://console.aws.amazon.com/route53/home?region=sa-east-1#hosted-zones:), escolha o domínio
correto [(chalacabar.com.br)](https://console.aws.amazon.com/route53/home?region=sa-east-1#resource-record-sets:ZKRMDBB2ENQR9) e edite o DNS  
`_acme-challenge` com o valor fornecido, espere 2 minutos e volte para o terminal e pressione enter para continuar.
Repita o processo pois são 2 registros (chalacabar.com.br e seus subdomínios *.chalacabar.com.br), vai mostrar um segundo valor para o DNS, altere na AWS, espere 2 minutos, pressione enter e pronto. 
 
obs: sem pressa, espere uns 2 ou 5 minutos para cada DNS ser atualizado
