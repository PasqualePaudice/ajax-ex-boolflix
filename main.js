$(document).ready(function(){


$('.film , .serie').hide();


















$('#cerca-film').keypress(function(event){





    if (event.which == 13) {

        ricerca();

    }

});

$('#button-cerca-film').click(ricerca);












});



function ricerca(){


    $('.film , .serie').show();


        var film_cercato = $('#cerca-film').val();

         $('#cerca-film').val('');

        if (film_cercato.length != 0) {
            $.ajax({
                'url':'https://api.themoviedb.org/3/search/multi',
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

                        var voto = film_corrente.vote_average;

                        var ha_la_classe = film_corrente.hasOwnProperty('known_for_department');

                        if (ha_la_classe == false) {


                            var votazione = stelle(voto);

                            var lingua = sceltaBandiera(film_corrente.original_language);



                            var compilazione = {};
                            if (film_corrente.media_type == 'movie') {
                                compilazione = {

                                    titolo : film_corrente.title,
                                    titolo_originale : film_corrente.original_title,
                                    lingua: lingua,
                                    voto : film_corrente.vote_average,
                                    copertina : 'https://image.tmdb.org/t/p/w342' + film_corrente.poster_path,
                                    stelle : votazione,
                                    tipo : 'Film',
                                    descrizione : film_corrente.overview

                                }
                                $('.film').append(template_function(compilazione));
                            }else{ if (film_corrente.media_type == 'tv') {
                                compilazione = {

                                    titolo : film_corrente.name,
                                    titolo_originale : film_corrente.original_name,
                                    lingua: lingua,
                                    voto : film_corrente.vote_average,
                                    copertina : 'https://image.tmdb.org/t/p/w342' + film_corrente.poster_path,
                                    stelle : votazione,
                                    tipo : 'Serie Tv',
                                    descrizione : film_corrente.overview

                                }
                                $('.serie').append(template_function(compilazione));
                            }

                        };

                        }






                    };
                },
                'error':function(data){
                    alert('error');
                }


            });
        }






};

function stelle(voto){
    var stelle = Math.ceil(voto / 2);

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

    return votazione;
}


function sceltaBandiera(lingua){


     if (lingua == 'en' ||  lingua == 'it' || lingua == 'es' || lingua == 'cn' ) {
        lingua = '<img class="flag" src="flag-'+ lingua +'.png" alt="">';

    };

    return lingua;
}
