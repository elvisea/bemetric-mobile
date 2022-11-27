import React from "react";
import { Box, ScrollView, Text } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";

interface Params {
  name: string;
  email: string;
}

export function AcceptTerms() {
  const navigation = useNavigation();

  const route = useRoute();
  const { name, email } = route.params as Params;

  const handleNextPage = () => navigation.navigate("Choose", { name, email });

  return (
    <LayoutDefault
      bg="blue.700"
      icon="chevron-left"
      functionIcon={() => navigation.goBack()}
      justifyContent="flex-start"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box
          px={8}
          flex={1}
          width="full"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Text fontWeight="bold" color="white" mb={4}>
            TERMO DE USO
          </Text>

          <Text fontWeight="bold" color="white" mb={4}>
            Quais informações estão presentes neste documento?
          </Text>

          <Text color="white" mb={4}>
            Neste Termo de Uso, o usuário do serviço B2K BeMetric encontrará
            informações sobre: o funcionamento do serviço e as regras aplicáveis
            a ele; o arcabouço legal relacionado à prestação do serviço; as
            responsabilidades do usuário ao utilizar o serviço; as
            responsabilidades da B2K ao prover o serviço; informações para
            contato, caso exista alguma dúvida, ou seja, necessário atualizar
            informações; e o foro responsável por eventuais reclamações caso
            questões deste Termo de Uso tenham sido violadas.
          </Text>

          <Text color="white" mb={4}>
            Além disso, na Política de Privacidade, o usuário do serviço B2K
            BeMetric encontrará informações sobre: qual o tratamento dos dados
            pessoais realizados, de forma automatizada ou não, e a sua
            finalidade; os dados pessoais dos usuários necessários para a
            prestação do serviço; a forma como eles são coletados; se há o
            compartilhamento de dados com terceiros; e quais as medidas de
            segurança implementadas para proteger os dados.
          </Text>

          <Text fontWeight="bold" color="white" mb={4}>
            Aceitação do Termo de Uso e Política de Privacidade
          </Text>

          <Text color="white" mb={4}>
            Ao utilizar os serviços, o usuário confirma que leu e compreendeu os
            Termos e Políticas aplicáveis ao serviço B2K BeMetric e concorda em
            ficar vinculado a eles.
          </Text>

          <Text fontWeight="bold" color="white" mb={4}>
            Definições
          </Text>

          <Text color="white" mb={4}>
            Para melhor compreensão deste documento, neste Termo de Uso e
            Política de Privacidade, consideram-se: Dado pessoal: informação
            relacionada a pessoa natural identificada ou identificável. Titular:
            pessoa natural a quem se referem os dados pessoais que são objeto de
            tratamento. Controlador: pessoa natural ou jurídica, de direito
            público ou privado, a quem competem as decisões referentes ao
            tratamento de dados pessoais. Operador: pessoa natural ou jurídica,
            de direito público ou privado, que realiza o tratamento de dados
            pessoais em nome do controlador. Encarregado: pessoa indicada pelo
            controlador e operador para atuar como canal de comunicação entre o
            controlador, os titulares dos dados e a Autoridade Nacional de
            Proteção de Dados (ANPD). Agentes de tratamento: o controlador e o
            operador. Tratamento: toda operação realizada com dados pessoais,
            como as que se referem a coleta, produção, recepção, classificação,
            utilização, acesso, reprodução, transmissão, distribuição,
            processamento, arquivamento, armazenamento, eliminação, avaliação ou
            controle da informação, modificação, comunicação, transferência,
            difusão ou extração. Uso compartilhado de dados: comunicação,
            difusão, transferência internacional, interconexão de dados pessoais
            ou tratamento compartilhado de bancos de dados pessoais por órgãos e
            entidades públicos no cumprimento de suas competências legais, ou
            entre esses e entes privados, reciprocamente, com autorização
            específica, para uma ou mais modalidades de tratamento permitidas
            por esses entes públicos, ou entres privados. Autoridade nacional:
            órgão da administração pública responsável por zelar, implementar e
            fiscalizar o cumprimento desta Lei em todo o território nacional.
            Usuários (ou "Usuário", quando individualmente considerado): todas
            as pessoas naturais que utilizarem o serviço serviço B2K BeMetric.
          </Text>

          <Text fontWeight="bold" color="white" mb={4}>
            Descrição do serviço
          </Text>

          <Text color="white" mb={4}>
            O serviço de telemetria de máquinas agrícolas desenvolvido e operado
            pela B2K Soluções Tecnológicas permite coletar dados dos
            equipamentos agrícolas através do dispositivo eletrônico fornecido
            pela B2K a ser instalado nos equipamentos agrícolas para
            monitoramento. O cliente após instalar o aplicativo móvel BeMetric
            em seu celular e criar sua conta poderá ativar o dispositivo
            instalado no maquinário de forma que os dados referentes a
            geolocalização, deslocamento, dados dos equipamentos sejam enviados
            para os servidores B2K que farão o processamento e geração as
            informações e insights dos equipamentos que serão disponibilizadas
            para o usuário através do aplicativo móvel BeMetric e pela console
            de administração acessada pela WEB. Pela console de administração
            WEB o usuário poderá visualizar as informações coletadas de seus
            equipamentos agrícolas bem como gerenciar suas informações e os
            usuários que acessam o serviço de telemetria de seus equipamentos.
            Além disto, o usuário poderá configurar pontos de interesse e áreas
            de trabalho que permitira gerar alertas de comportamento e eventos a
            serem enviados para console WEB e aplicativo móvel BeMetric e
            computar as atividades executadas dentro destas áreas de trabalho.
          </Text>

          <Text fontWeight="bold" color="white" mb={4}>
            Agentes de tratamento
          </Text>

          <Text fontWeight="bold" color="white" mb={4}>
            A quem compete as decisões referentes ao tratamento de dados
            pessoais realizado no serviço B2K BeMetric (Controlador)?
          </Text>

          <Text color="white" mb={2}>
            A Lei Geral de Proteção de Dados define como controlador, em seu
            artigo 5º;
          </Text>

          <Text color="white" mb={2}>
            Art. 5º, VI – controlador: pessoa natural ou jurídica, de direito
            público ou privado, a quem competem as decisões referentes ao
            tratamento de dados pessoais;
          </Text>

          <Text color="white" mb={2}>
            Para o serviço B2K BeMetric, as decisões referentes ao tratamento de
            dados pessoais são de responsabilidade do B2K SOLUÇÕES TECNOLOGICAS
            LTDA - CNPJ nº 26.232.767/0001-30.
          </Text>

          <Text color="white" mb={2}>
            Endereço: Av. Água Verde, 1535, bairro Água Verde, Curitiba-PR.
          </Text>

          <Text color="white" mb={2}>
            E-mail: contato@b2ktech.com.br. Telefone: 41 3606-1917.
          </Text>

          <Text fontWeight="bold" color="white" mb={4}>
            Quem realiza o tratamento de dados (Operador)?
          </Text>

          <Text color="white" mb={4}>
            A Lei Geral de Proteção de Dados define como operador, em seu artigo
            5º: Art. 5º, VII - operador: pessoa natural ou jurídica, de direito
            público ou privado, que realiza o tratamento de dados pessoais em
            nome do controlador. Para o serviço B2K BeMetric, quem realiza o
            tratamento de dados pessoais é o próprio controlador.
          </Text>

          <Text fontWeight="bold" color="white" mb={4}>
            Quem é o responsável por atuar como canal de comunicação entre o
            controlador, os titulares dos dados e a Autoridade Nacional de
            Proteção de Dados (Encarregado)?
          </Text>

          <Text color="white" mb={4}>
            A Lei Geral de Proteção de Dados define como encarregado, em seu
            artigo 5º: Art. 5º, VIII – pessoa indicada pelo controlador e
            operador para atuar como canal de comunicação entre o controlador,
            os titulares dos dados e a Autoridade Nacional de Proteção de Dados
            (ANPD). Para o serviço B2K BeMetric, que é responsável por atuar
            como canal de comunicação entre o controlador, os titulares dos
            dados e a Autoridade Nacional de Proteção de Dados é o encarregado
            Bruno Xavier. E-mail: dpo@sprogroup.com.br.
          </Text>

          <Text fontWeight="bold" color="white" mb={4}>
            Quais são as leis e normativos aplicáveis a esse serviço?
          </Text>

          <Text color="white" mb={4}>
            -Lei nº 12.965, de 23 de abril de 2014 - Marco Civil da Internet –
            Estabelece princípios, garantias, direitos e deveres para o uso da
            Internet no Brasil. -Lei nº 13.709, de 14 de agosto de 2018 - Dispõe
            sobre o tratamento de dados pessoais, inclusive nos meios digitais,
            por pessoa natural ou por pessoa jurídica de direito público ou
            privado, com o objetivo de proteger os direitos fundamentais de
            liberdade e de privacidade e o livre desenvolvimento da
            personalidade da pessoa natural.
          </Text>

          <Text fontWeight="bold" color="white" mb={4}>
            Quais são os direitos do usuário do serviço?
          </Text>

          <Text color="white" mb={4}>
            O usuário do serviço possui os seguintes direitos, conferidos pela
            Lei de Proteção de Dados Pessoais:
          </Text>

          <Text color="white" mb={4}>
            - Direito de confirmação e acesso (Art. 18, I e II): é o direito do
            usuário de obter do serviço a confirmação de que os dados pessoais
            que lhe digam respeito são ou não objeto de tratamento e, se for
            esse o caso, o direito de acessar os seus dados pessoais.
          </Text>

          <Text color="white" mb={4}>
            - Direito de retificação (Art. 18, III): é o direito de solicitar a
            correção de dados incompletos, inexatos ou desatualizado
          </Text>

          <Text color="white" mb={4}>
            - Direito à limitação do tratamento dos dados (Art. 18, IV): é o
            direito do usuário de limitar o tratamento de seus dados pessoais,
            podendo exigir a eliminação de dados desnecessários, excessivos ou
            tratados em desconformidade com o disposto na Lei Geral de Proteção
            de Dados.
          </Text>

          <Text color="white" mb={4}>
            - Direito de oposição (Art. 18, § 2º): é o direito do usuário de, a
            qualquer momento, se opor ao tratamento de dados por motivos
            relacionados com a sua situação particular, com fundamento em uma
            das hipóteses de dispensa de consentimento ou em caso de
            descumprimento ao disposto na Lei Geral de Proteção de Dados.
          </Text>

          <Text color="white" mb={4}>
            - Direito de portabilidade dos dados (Art. 18, V): é o direito do
            usuário de realizar a portabilidade dos dados a outro fornecedor de
            serviço ou produto, mediante requisição expressa, de acordo com a
            regulamentação da autoridade nacional, observados os segredos
            comercial e industrial.
          </Text>

          <Text color="white" mb={4}>
            - Direito de não ser submetido a decisões automatizadas (Art. 20,
            LGPD): o titular dos dados tem direito a solicitar a revisão de
            decisões tomadas unicamente com base em tratamento automatizado de
            dados pessoais que afetem seus interesses, incluídas as decisões
            destinadas a definir o seu perfil pessoal, profissional, de consumo
            e de crédito ou os aspectos de sua personalidade.
          </Text>

          <Text color="white" mb={4}>
            O usuário se responsabiliza pela precisão e veracidade dos dados
            informados e reconhece que a inconsistência destes poderá implicar a
            impossibilidade de se utilizar o serviço B2K BeMetric. Durante a
            utilização do serviço, a fim de resguardar e de proteger os direitos
            de terceiros, o usuário se compromete a fornecer somente seus dados
            pessoais, e não os de terceiros. O login e senha só poderão ser
            utilizados pelo usuário cadastrado. Ele se compromete em manter o
            sigilo da senha, que é pessoal e intransferível, não sendo possível,
            em qualquer hipótese, a alegação de uso indevido, após o ato de
            compartilhamento. O usuário do serviço é responsável pela
            atualização das suas informações pessoais e consequências na omissão
            ou erros nas informações pessoais cadastradas. O Usuário é
            responsável pela reparação de todos e quaisquer danos, diretos ou
            indiretos (inclusive decorrentes de violação de quaisquer direitos
            de outros usuários, de terceiros, inclusive direitos de propriedade
            intelectual, de sigilo e de personalidade), que sejam causados à
            B2K, a qualquer outro Usuário, ou, ainda, a qualquer terceiro,
            inclusive em virtude do descumprimento do disposto nestes Termos de
            Uso e Política de Privacidade ou de qualquer ato praticado a partir
            de seu acesso ao serviço. O Órgão não poderá ser responsabilizado
            pelos seguintes fatos:
          </Text>

          <Text color="white" mb={2}>
            a. Equipamento infectado ou invadido por atacantes;
          </Text>

          <Text color="white" mb={2}>
            b. Equipamento avariado no momento do consumo de serviços;
          </Text>

          <Text color="white" mb={2}>
            c. Proteção do computador;
          </Text>

          <Text color="white" mb={2}>
            d. Proteção das informações baseadas nos computadores dos usuários;
          </Text>

          <Text color="white" mb={2}>
            e. Abuso de uso dos computadores dos usuários;
          </Text>

          <Text color="white" mb={2}>
            f. Monitoração clandestina do computador dos usuários;
          </Text>

          <Text color="white" mb={2}>
            g. Vulnerabilidades ou instabilidades existentes nos sistemas dos
            usuários;
          </Text>

          <Text color="white" mb={2}>
            h. Perímetro inseguro;
          </Text>

          <Text color="white" mb={4}>
            Em nenhuma hipótese, a B2K será responsável pela instalação no
            equipamento do Usuário ou de terceiros, de códigos maliciosos
            (vírus, trojans, malware, worm, bot, backdoor, spyware, rootkit, ou
            de quaisquer outros que venham a ser criados), em decorrência da
            navegação na Internet pelo Usuário.
          </Text>

          <Text fontWeight="bold" color="white" mb={4}>
            Quais são as responsabilidades da B2K com meus dados?
          </Text>

          <Text color="white" mb={4}>
            A B2K se compromete a cumprir todas as legislações inerentes ao uso
            correto dos dados pessoais do cidadão de forma a preservar a
            privacidade dos dados utilizados no serviço, bem como a garantir
            todos os direitos e garantias legais dos titulares dos dados. Ela
            também se obriga a promover, independentemente de requerimentos, a
            divulgação em local de fácil acesso, no âmbito de suas competências,
            de informações de interesse coletivo ou geral por eles produzidas ou
            custodiadas. É de responsabilidade da B2K implementar controles de
            segurança para proteção dos dados pessoais dos titulares. A B2K
            poderá, quanto às ordens judiciais de pedido das informações,
            compartilhar informações necessárias para investigações ou tomar
            medidas relacionadas a atividades ilegais, suspeitas de fraude ou
            ameaças potenciais contra pessoas, bens ou sistemas que sustentam o
            Serviço ou de outra forma necessária para cumprir com nossas
            obrigações legais. Caso ocorra, a B2K notificará os titulares dos
            dados, salvo quando o processo estiver em segredo de justiça.
          </Text>

          <Text color="white" mb={4}>
            POLÍTICA DE PRIVACIDADE deve ser consulta nesse link
          </Text>
        </Box>
      </ScrollView>
      <ButtonFull title="Avançar" onPress={handleNextPage} />
    </LayoutDefault>
  );
}
