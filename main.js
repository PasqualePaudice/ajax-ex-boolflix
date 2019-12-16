$(document).ready(function(){












    ricerca();








});



function ricerca(){

    $('#button-cerca-film').click(function(){

        var film_cercato = $('#cerca-film').val();



        $.ajax({
            'url':'https://api.themoviedb.org/3/search/movie',
            'data': {
                'api_key':'f3534c353eab17db2456e44f0cf8e1b0',
                'query':film_cercato,
                'language':'it-IT'
            },
            'methods':'get',
            'success':function(data){
                $('.card').hide();
                var template_card = $('#template-card').html();
                var template_function = Handlebars.compile(template_card);

                var film = data.results;
                for (var i = 0; i < film.length; i++) {
                    var film_corrente=film[i];

                    var compilazione = {

                        titolo : film_corrente.title,
                        titolo_originale : film_corrente.original_title,
                        lingua : film_corrente.language,
                        voto : film_corrente.vote_average,
                        copertina : 'https://image.tmdb.org/t/p/w500' + film_corrente.poster_path,

                    }

                        $('.container').append(template_function(compilazione));


                }
            },
            'error':function(data){
                alert('error');
            }


        });

    });
};
