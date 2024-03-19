# Optimistic Updates

AGGIORNO SUBITO lato client il mio stato
ALLO STESSO TEMPO invio richiesta per update lato server -> SE si verifica un problema:

- NOTIFICO all’utente occhio che c’e’ stato un problema con l'aggiornamento.
- SETTO il mio stato ai valori precedenti l’aggiornamento.

## Approccio Homemade

Approccio semplice che va bene se la logica delle nostre applicazioni e' lineare.
Piu' l'applicazione cresce di complessita', maggiore e' difficile manutenere questa soluzione.

## Approccio React Query

React query viene utilizzato come gestore di stati asyncroni.
Viene utilizzato per fetchare dati in applicazioni piu' complesse.
