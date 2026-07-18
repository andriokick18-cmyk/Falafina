package com.falafina.app

/* GERADO a partir do PALAVRA_DIA_POOL do index.html — fonte única.
   Pra atualizar: rode o extrator (ver VERSAO_V844.md). */
data class Palavra(val en: String, val som: String, val pt: String, val fEn: String, val fPt: String)

object Palavras {
  val POOL: List<Palavra> = listOf(
    Palavra("reliable", "riláiabol", "confiável", "He is a very reliable worker.", "Ele é um trabalhador muito confiável."),
    Palavra("opportunity", "oportúniti", "oportunidade", "This job is a great opportunity.", "Este trabalho é uma grande oportunidade."),
    Palavra("achievement", "atchívment", "conquista", "Finishing the season was a big achievement.", "Terminar a temporada foi uma grande conquista."),
    Palavra("hardworking", "rárd-uôrkin", "trabalhador / esforçado", "She is the most hardworking person here.", "Ela é a pessoa mais esforçada daqui."),
    Palavra("trustworthy", "trâst-uôrdhi", "digno de confiança", "A trustworthy person keeps their word.", "Uma pessoa de confiança cumpre a palavra."),
    Palavra("knowledge", "nóledj", "conhecimento", "Knowledge opens many doors.", "O conhecimento abre muitas portas."),
    Palavra("courage", "kâredj", "coragem", "It takes courage to work far from home.", "É preciso coragem pra trabalhar longe de casa."),
    Palavra("challenge", "tchélendj", "desafio", "Every new job is a challenge.", "Todo trabalho novo é um desafio."),
    Palavra("success", "sâksés", "sucesso", "Success comes from daily effort.", "O sucesso vem do esforço diário."),
    Palavra("growth", "grôuth", "crescimento", "I see real growth in my English.", "Vejo um crescimento real no meu inglês."),
    Palavra("purpose", "pêrpos", "propósito", "My family is my purpose.", "Minha família é meu propósito."),
    Palavra("patience", "pêichens", "paciência", "Learning a language takes patience.", "Aprender uma língua exige paciência."),
    Palavra("discipline", "dísiplin", "disciplina", "Discipline beats talent.", "Disciplina vence talento."),
    Palavra("freedom", "frídom", "liberdade", "Speaking English gives you freedom.", "Falar inglês te dá liberdade."),
    Palavra("journey", "djêrni", "jornada", "Enjoy the journey, not just the arrival.", "Aproveite a jornada, não só a chegada."),
    Palavra("responsible", "rispônsibol", "responsável", "I am responsible for my results.", "Eu sou responsável pelos meus resultados."),
    Palavra("efficient", "efíchent", "eficiente", "She found a more efficient way to work.", "Ela achou um jeito mais eficiente de trabalhar."),
    Palavra("punctual", "pânktchual", "pontual", "Being punctual shows respect.", "Ser pontual demonstra respeito."),
    Palavra("motivated", "môutivêited", "motivado", "I stay motivated by thinking of my goals.", "Fico motivado pensando nas minhas metas."),
    Palavra("dedicated", "dédikêited", "dedicado", "He is dedicated to his family.", "Ele é dedicado à família."),
    Palavra("available", "avêilabol", "disponível", "I am available to start immediately.", "Estou disponível pra começar imediatamente."),
    Palavra("flexible", "fléksibol", "flexível", "I am flexible with my schedule.", "Sou flexível com meus horários."),
    Palavra("experienced", "ekspíriensd", "experiente", "We need an experienced cook.", "Precisamos de um cozinheiro experiente."),
    Palavra("committed", "comíted", "comprometido", "I am committed to finishing the contract.", "Estou comprometido em terminar o contrato."),
    Palavra("determined", "ditêrmind", "determinado", "She is determined to learn English.", "Ela está determinada a aprender inglês."),
    Palavra("accomplish", "acômplich", "realizar / alcançar", "You can accomplish anything with effort.", "Você pode alcançar qualquer coisa com esforço."),
    Palavra("overcome", "ôuvercâm", "superar", "I overcame my fear of speaking.", "Eu superei meu medo de falar."),
    Palavra("provide", "prováid", "prover / sustentar", "I work hard to provide for my family.", "Trabalho duro pra sustentar minha família."),
    Palavra("deserve", "dizêrv", "merecer", "You deserve this opportunity.", "Você merece esta oportunidade."),
    Palavra("encourage", "encâredj", "incentivar", "Good leaders encourage their team.", "Bons líderes incentivam a equipe."),
    Palavra("appreciate", "aprí-chiêit", "agradecer / valorizar", "I appreciate your help.", "Agradeço muito a sua ajuda."),
    Palavra("recommend", "recoménd", "recomendar", "My boss recommended me for the job.", "Meu chefe me recomendou pra vaga."),
    Palavra("improve", "imprúv", "melhorar", "I improve a little every day.", "Eu melhoro um pouco a cada dia."),
    Palavra("strength", "strénth", "força", "My strength comes from my family.", "Minha força vem da minha família."),
    Palavra("wisdom", "uízdom", "sabedoria", "Experience brings wisdom.", "A experiência traz sabedoria."),
    Palavra("honesty", "ónesti", "honestidade", "Honesty builds trust.", "A honestidade constrói confiança."),
    Palavra("gratitude", "grétitúd", "gratidão", "I feel gratitude for this chance.", "Sinto gratidão por esta chance."),
    Palavra("effort", "éfort", "esforço", "Great results demand great effort.", "Grandes resultados exigem grande esforço."),
    Palavra("confidence", "cónfidens", "confiança (em si)", "Practice gives you confidence.", "A prática te dá confiança."),
    Palavra("respect", "rispékt", "respeito", "Treat everyone with respect.", "Trate todos com respeito."),
    Palavra("progress", "prógres", "progresso", "Small progress is still progress.", "Progresso pequeno ainda é progresso."),
    Palavra("dedication", "dedikêichon", "dedicação", "Dedication turns dreams into plans.", "A dedicação transforma sonhos em planos."),
    Palavra("ambition", "embíchon", "ambição", "Ambition without action is just a dream.", "Ambição sem ação é só um sonho."),
    Palavra("perseverance", "pêrsevírans", "perseverança", "Perseverance wins where talent gives up.", "A perseverança vence onde o talento desiste."),
    Palavra("opportunity cost", "oportúniti cóst", "custo de oportunidade", "Wasted time is an opportunity cost.", "Tempo desperdiçado é custo de oportunidade."),
    Palavra("teamwork", "tím-uôrk", "trabalho em equipe", "Teamwork makes the dream work.", "O trabalho em equipe faz o sonho funcionar."),
    Palavra("resilient", "rizíliente", "resiliente", "Workers like you are resilient.", "Trabalhadores como você são resilientes."),
    Palavra("breakthrough", "brêik-thru", "grande avanço", "Speaking without fear was my breakthrough.", "Falar sem medo foi meu grande avanço.")
  )
}
