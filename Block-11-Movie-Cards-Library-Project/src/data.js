const movies = [{
  title: '007',
  subtitle: 'Double O Seven',
  storyline: 'James Bond deixou o serviço ativo. '
    + 'Mas a paz do agente britânico dura pouco quando Felix Leiter (Jeffrey Wright), '
    + 'um velho amigo da CIA, pedindo ajuda.',
  imagePath: 'https://img.olhardigital.com.br/wp-content/uploads/2021/04/Project-007-sera-um-novo-jogo-que-ira-construi-um-universo-para-James-Bond-dentro-dos-games.jpg',
  rating: 6.5,
}, {
  title: 'Batman vs Superman',
  subtitle: 'Dawn of Justice',
  storyline: 'Ainda não se sabde muito, mas sabemos que o Adão Negro é um super-vilão, '
    + 'uma espécie de versão mdaligna de Shazam, sendo seu principal arqui-inimigo. ',
  imagePath: 'https://exame.com/wp-content/uploads/2020/05/3628577.jpg',
  rating: 7.5,
},{
  title: 'Aquaman',
  subtitle: 'A half-Atlantean',
  storyline: 'James Bond deixou o serviço ativo. '
    + 'Mas a paz do agente britânico dura pouco quando Felix Leiter (Jeffrey Wright), '
    + 'um velho amigo da CIA, pedindo ajuda.',
  imagePath: 'https://cinemacomrapadura.com.br/imagens/2018/06/20180624-jason-momoa-in-aquaman-2018-movie-jy-1280x720-1.jpg',
  rating: 8.5,
}, {
  title: 'Warcraft',
  subtitle: 'Crusade Classic',
  storyline: 'Ainda não sse sabe muito, mas sabemos que o Adão Negro é um super-vilão, '
    + 'uma espécie de versãdo maligna de Shazam, sendo seu principal arqui-inimigo. ',
  imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPTm2a9e5vtggGYLObVtqQNUiKIMXQfxBMebMyEaryYRgzgfC5M3EhP5DfCPiLt_pqUd4&usqp=CAU',
  rating: 10.0,
}, {
  title: 'Mortal Kombat',
  subtitle: 'Fatallity',
  storyline: 'Ainda não se sabe muito, mas sabemos que o Adão Negro é um super-vilão, '
    + 'uma espécie de versão maligna de Shazam, sendo seu principal arqui-inimigo. ',
  imagePath: 'https://www.slashgear.com/wp-content/uploads/2021/01/MK2021-1280x720.jpg',
  rating: 4.5,
}, {
  title: 'Black Widow ',
  subtitle: 'Marvel Comics',
  storyline: 'Ainda não se sabe muito, mas sabemos que o Adão Negro é um super-vilão, '
    + 'uma espécie de versão maligna de Shazam, sendo seu principal arqui-inimigo. ',
  imagePath: 'https://oyster.ignimgs.com/wordpress/stg.ign.com/2020/12/wallpapersden.com_black-widow-official-poster_1280x720.jpg',
  rating: 8.5,
}, {
    title: 'Kingsglaive',
    subtitle: 'Final Fantasy XV',
    storyline: 'King Regis, who oversees the land of Lucis, commands his army of soldiers to protect the kingdom from the Niflheim empire\'s plans to steal the sacred crystal.',
    rating: 4.5,
    imagePath: 'images/Kingsglaive_Final_Fantasy_XV.jpg',
  },
  {
    title: 'Final Fantasy',
    subtitle: 'Spirits Within',
    storyline: 'A scientist makes a last stand on Earth with the help of a ragtag team of soldiers against an invasion of alien phantoms.',
    rating: 4.5,
    imagePath: 'images/Final_Fantasy_Spirits_Within.jpg',
  },
  {
    title: 'Ghost In The Shell',
    subtitle: 'Ghost In The Shell',
    storyline: 'A hacker known as the Puppet Master is hunted by a female cyborg cop and her partner. This film is a revised version of Ghost in the Shell (1995).',
    rating: 5,
    imagePath: 'images/Ghost_In_The_Shell_2_0.jpg',
  },
  {
    title: 'Appleseed Alpha',
    subtitle: 'Appleseed Alpha',
    storyline: 'A young female soldier Deunan and her cyborg partner Briareos survive through the post World War 3 apocalyptic New York in search of human\'s future hope, the legendary city of Olympus.',
    rating: 3.8,
    imagePath: 'images/Appleseed_Alpha.jpg',
  },
  {
    title: 'Resident Evil',
    subtitle: 'Vendetta',
    storyline: 'Chris Redfield enlists the help of Leon S. Kennedy and Rebecca Chambers to stop a death merchant, with a vengeance, from spreading a deadly virus in New York.',
    rating: 4.2,
    imagePath: 'images/Resident_Evil_Vendetta.jpg',
  },{
    title: '007',
    subtitle: 'Double O Seven',
    storyline: 'James Bond deixou o serviço ativo. '
      + 'Mas a paz do agente britânico dura pouco quando Felix Leiter (Jeffrey Wright), '
      + 'um velho amigo da CIA, pedindo ajuda.',
    imagePath: 'https://img.olhardigital.com.br/wp-content/uploads/2021/04/Project-007-sera-um-novo-jogo-que-ira-construi-um-universo-para-James-Bond-dentro-dos-games.jpg',
    rating: 6.5,
  }, {
    title: 'Batman vs Superman',
    subtitle: 'Dawn of Justice',
    storyline: 'Ainda não se sabde muito, mas sabemos que o Adão Negro é um super-vilão, '
      + 'uma espécie de versão mdaligna de Shazam, sendo seu principal arqui-inimigo. ',
    imagePath: 'https://exame.com/wp-content/uploads/2020/05/3628577.jpg',
    rating: 7.5,
  },{
    title: 'Aquaman',
    subtitle: 'A half-Atlantean',
    storyline: 'James Bond deixou o serviço ativo. '
      + 'Mas a paz do agente britânico dura pouco quando Felix Leiter (Jeffrey Wright), '
      + 'um velho amigo da CIA, pedindo ajuda.',
    imagePath: 'https://cinemacomrapadura.com.br/imagens/2018/06/20180624-jason-momoa-in-aquaman-2018-movie-jy-1280x720-1.jpg',
    rating: 8.5,
  }, {
    title: 'Warcraft',
    subtitle: 'Crusade Classic',
    storyline: 'Ainda não sse sabe muito, mas sabemos que o Adão Negro é um super-vilão, '
      + 'uma espécie de versãdo maligna de Shazam, sendo seu principal arqui-inimigo. ',
    imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPTm2a9e5vtggGYLObVtqQNUiKIMXQfxBMebMyEaryYRgzgfC5M3EhP5DfCPiLt_pqUd4&usqp=CAU',
    rating: 10.0,
  }, {
    title: 'Mortal Kombat',
    subtitle: 'Fatallity',
    storyline: 'Ainda não se sabe muito, mas sabemos que o Adão Negro é um super-vilão, '
      + 'uma espécie de versão maligna de Shazam, sendo seu principal arqui-inimigo. ',
    imagePath: 'https://www.slashgear.com/wp-content/uploads/2021/01/MK2021-1280x720.jpg',
    rating: 4.5,
  }, {
    title: 'Black Widow ',
    subtitle: 'Marvel Comics',
    storyline: 'Ainda não se sabe muito, mas sabemos que o Adão Negro é um super-vilão, '
      + 'uma espécie de versão maligna de Shazam, sendo seu principal arqui-inimigo. ',
    imagePath: 'https://oyster.ignimgs.com/wordpress/stg.ign.com/2020/12/wallpapersden.com_black-widow-official-poster_1280x720.jpg',
    rating: 8.5,
  }, {
      title: 'Kingsglaive',
      subtitle: 'Final Fantasy XV',
      storyline: 'King Regis, who oversees the land of Lucis, commands his army of soldiers to protect the kingdom from the Niflheim empire\'s plans to steal the sacred crystal.',
      rating: 4.5,
      imagePath: 'images/Kingsglaive_Final_Fantasy_XV.jpg',
    },
    {
      title: 'Final Fantasy',
      subtitle: 'Spirits Within',
      storyline: 'A scientist makes a last stand on Earth with the help of a ragtag team of soldiers against an invasion of alien phantoms.',
      rating: 4.5,
      imagePath: 'images/Final_Fantasy_Spirits_Within.jpg',
    },
    {
      title: 'Ghost In The Shell',
      subtitle: 'Ghost In The Shell',
      storyline: 'A hacker known as the Puppet Master is hunted by a female cyborg cop and her partner. This film is a revised version of Ghost in the Shell (1995).',
      rating: 5,
      imagePath: 'images/Ghost_In_The_Shell_2_0.jpg',
    },
    {
      title: 'Appleseed Alpha',
      subtitle: 'Appleseed Alpha',
      storyline: 'A young female soldier Deunan and her cyborg partner Briareos survive through the post World War 3 apocalyptic New York in search of human\'s future hope, the legendary city of Olympus.',
      rating: 3.8,
      imagePath: 'images/Appleseed_Alpha.jpg',
    },
    {
      title: 'Resident Evil',
      subtitle: 'Vendetta',
      storyline: 'Chris Redfield enlists the help of Leon S. Kennedy and Rebecca Chambers to stop a death merchant, with a vengeance, from spreading a deadly virus in New York.',
      rating: 4.2,
      imagePath: 'images/Resident_Evil_Vendetta.jpg',
    },
];

export default movies;
