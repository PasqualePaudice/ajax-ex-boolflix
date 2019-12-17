$(document).ready(function(){



$('#cerca-film').keypress(function(event){

    if (event.which == 13) {

        ricerca();

    }

});

$('#button-cerca-film').click(ricerca);












});



function ricerca(){



        var film_cercato = $('#cerca-film').val();

         $('#cerca-film').val('');

        if (film_cercato.length != 0) {
            $.ajax({
                'url':'https://api.themoviedb.org/3/search/movie',
                'data': {
                    'api_key':'f3534c353eab17db2456e44f0cf8e1b0',
                    'query':film_cercato,
                    'language':'it-IT'
                },
                'methods':'get',
                'success':function(data){
                    $('.card').remove();
                    var template_card = $('#template-card').html();
                    var template_function = Handlebars.compile(template_card);


                    var film = data.results;

                    for (var i = 0; i < film.length; i++) {


                        var film_corrente=film[i];

                        var stelle = Math.ceil(film_corrente.vote_average / 2);

                        var votazione ='';

                        console.log(stelle);

                        for (var j = 0; j < stelle; j++) {
                            votazione += '<i class="fas fa-star"></i>';
                            console.log(votazione);
                        };



                        var stelle_vuote = 5 - stelle;
                        var v = 0;
                        while (v != stelle_vuote) {
                            votazione += '<i class="far fa-star"></i>';
                            v++;
                        }





                         if (film_corrente.original_language == 'en' ||  film_corrente.original_language == 'it' || film_corrente.original_language == 'es'  ) {
                            film_corrente.original_language = '<img class="flag" src="flag-'+ film_corrente.original_language +'.png" alt="">';

                        };
                        // }
                        // if (film_corrente.original_language == 'it') {
                        //     film_corrente.original_language = '<img class="flag" src="flag-it.png" alt="">';
                        // }
                        // if (film_corrente.original_language == 'es') {
                        //     film_corrente.original_language = '<img class="flag" src="flag-es.png" alt="">';
                        // }




                        var compilazione = {

                            titolo : film_corrente.title,
                            titolo_originale : film_corrente.original_title,
                            lingua: film_corrente.original_language,
                            voto : film_corrente.vote_average,
                            copertina : 'https://image.tmdb.org/t/p/w500' + film_corrente.poster_path,
                            stelle : votazione

                        }

                            $('.container').append(template_function(compilazione));


                    };
                },
                'error':function(data){
                    alert('error');
                }


            });
        }




};
