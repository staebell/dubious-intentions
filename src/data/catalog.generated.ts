export const generatedCatalog = {
  "themes": [
    {
      "key": "known-offenders",
      "name": "Known Offenders",
      "intro": "The drinks with the longest rap sheet and the strongest case for a second round.",
      "order": 1
    },
    {
      "key": "tequila-sunday",
      "name": "Tequila Sunday",
      "intro": "Agave drinks with a backstory, a tan line, and no interest in behaving modestly.",
      "order": 2
    },
    {
      "key": "the-usual-suspects",
      "name": "The Usual Suspects",
      "intro": "Reliable regulars, frequently requested, and somehow never a bad idea in the moment.",
      "order": 3
    },
    {
      "key": "adult-swim",
      "name": "Adult Swim",
      "intro": "Poolside judgment may be impaired. Hydration remains more of a theory than a plan.",
      "order": 4
    },
    {
      "key": "cool-runnings",
      "name": "Cool Runnings",
      "intro": "Frozen format, warm reception. Slushies, milkshakes, and good decisions postponed.",
      "order": 5
    },
    {
      "key": "off-the-beaten-path",
      "name": "Off the Beaten Path",
      "intro": "A little less expected, a little more adventurous, and always worth the detour.",
      "order": 6
    },
    {
      "key": "that-escalated-quickly",
      "name": "That Escalated Quickly",
      "intro": "Some people end with shots, but why not start with them?",
      "order": 7
    },
    {
      "key": "spirit-rum",
      "name": "Rum",
      "intro": "Rum-forward classics and tropical heavy hitters.",
      "order": 20
    },
    {
      "key": "spirit-whiskey",
      "name": "Whiskey",
      "intro": "Bourbon and whiskey builds from bright sours to spirit-forward classics.",
      "order": 21
    },
    {
      "key": "spirit-gin",
      "name": "Gin",
      "intro": "Gin cocktails with citrus, herbs, and crisp bitter balance.",
      "order": 22
    },
    {
      "key": "spirit-vodka",
      "name": "Vodka",
      "intro": "Vodka standards and party-friendly pours.",
      "order": 23
    },
    {
      "key": "spirit-smoke",
      "name": "Smoked Cocktails",
      "intro": "Smoky pours with big flavor and dramatic energy.",
      "order": 24
    },
    {
      "key": "spirit-martinis",
      "name": "Martinis",
      "intro": "Up, chilled, and built for the martini crowd.",
      "order": 25
    },
    {
      "key": "spirit-spritz",
      "name": "Spritz",
      "intro": "Bubbly, bitter, citrusy, and built for long afternoons.",
      "order": 26
    },
    {
      "key": "spirit-liqueurs",
      "name": "Unique Liqueurs",
      "intro": "Liqueur-led cocktails and less-common riffs.",
      "order": 27
    }
  ],
  "drinks": [
    {
      "id": "el-chupacabra",
      "name": "El Chupacabra",
      "description": "Reposado tequila heat with citrus and tajin edge",
      "themes": [
        "known-offenders",
        "tequila-sunday"
      ],
      "ingredients": "Reposado tequila | Cointreau | agave nectar | lime juice | jalapenos | grapefruit juice | tajin rim",
      "availability": [
        "jalapeno"
      ],
      "sort": 1,
      "imageFile": "el-chupacabra.webp",
      "isShot": false,
      "themeSortOverrides": {
        "known-offenders": 1,
        "tequila-sunday": 3
      }
    },
    {
      "id": "pisco-sour",
      "name": "Pisco Sour",
      "description": "Silky citrus classic with bitters finish",
      "themes": [
        "known-offenders"
      ],
      "ingredients": "2 oz pisco | 1 oz simple syrup | 0.75 oz key lime juice | 1 egg white | 3 dashes bitters",
      "availability": [
        "egg_white"
      ],
      "sort": 2,
      "imageFile": "pisco-sour.webp",
      "isShot": false,
      "themeSortOverrides": {
        "known-offenders": 3
      }
    },
    {
      "id": "sugar-cookie-martini",
      "name": "Sugar Cookie Martini",
      "description": "Dessert-leaning martini with vanilla and amaretto",
      "themes": [
        "known-offenders"
      ],
      "ingredients": "1.5 oz vanilla or cake vodka | 1.5 oz Baileys | 0.75 oz amaretto | 1 tsp sugar | coated rim",
      "availability": [],
      "sort": 3,
      "imageFile": "sugar-cookie-martini.webp",
      "isShot": false,
      "themeSortOverrides": {
        "known-offenders": 4
      }
    },
    {
      "id": "sidecar",
      "name": "Sidecar",
      "description": "Cognac citrus staple with sugared rim",
      "themes": [
        "known-offenders"
      ],
      "ingredients": "1.5 oz cognac | 0.75 oz Cointreau | 0.75 oz lemon juice | sugar rim | orange twist",
      "availability": [],
      "sort": 4,
      "imageFile": "sidecar.webp",
      "isShot": false,
      "themeSortOverrides": {
        "known-offenders": 5
      }
    },
    {
      "id": "horsefeather",
      "name": "Horsefeather",
      "description": "Bourbon and ginger beer with bitters snap",
      "themes": [
        "known-offenders",
        "spirit-whiskey"
      ],
      "ingredients": "1.5 oz bourbon | 4 oz ginger beer | 5 heavy dashes Angostura bitters | lemon wedge or lemon juice",
      "availability": [],
      "sort": 5,
      "imageFile": "horsefeather.webp",
      "isShot": false,
      "themeSortOverrides": {
        "known-offenders": 6
      }
    },
    {
      "id": "cadillac-margarita",
      "name": "Cadillac Margarita",
      "description": "Top-shelf margarita lane",
      "themes": [
        "tequila-sunday"
      ],
      "ingredients": "1.5 oz reposado tequila | 1 oz Cointreau | 1 oz lime juice | 1 oz Grand Marnier | salt rim | lime wedge",
      "availability": [],
      "sort": 6,
      "imageFile": "cadillac-margarita.webp",
      "isShot": false,
      "themeSortOverrides": {
        "tequila-sunday": 1
      }
    },
    {
      "id": "pineapple-jalapeno-margarita",
      "name": "Pineapple Jalapeno Margarita",
      "description": "Sweet heat pineapple agave balance",
      "themes": [
        "tequila-sunday"
      ],
      "ingredients": "1 oz tequila | 0.5 oz Agavero | 0.5 oz triple sec | 0.75 oz lime juice | 0.5 oz honey | 3 oz pineapple juice | jalapenos | tajin rim",
      "availability": [
        "jalapeno"
      ],
      "sort": 7,
      "imageFile": "pineapple-jalapeno-margarita.webp",
      "isShot": false,
      "themeSortOverrides": {
        "tequila-sunday": 2
      }
    },
    {
      "id": "serrano-pineapple-margarita",
      "name": "Serrano Pineapple Margarita",
      "description": "Minty serrano pineapple crusher",
      "themes": [
        "tequila-sunday"
      ],
      "ingredients": "2 oz tequila | 0.5 oz orange liquor | lime juice | 2 tsp honey | 4 mint leaves | serrano chile | pineapple chunks | ginger beer",
      "availability": [
        "serrano",
        "mint"
      ],
      "sort": 8,
      "imageFile": "serrano-pineapple-margarita.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "paloma",
      "name": "Paloma",
      "description": "Grapefruit-forward agave refresher",
      "themes": [
        "tequila-sunday",
        "adult-swim"
      ],
      "ingredients": "2 oz tequila | 0.5 oz lime juice | grapefruit juice",
      "availability": [],
      "sort": 9,
      "imageFile": "paloma.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "tequila-sour",
      "name": "Tequila Sour",
      "description": "Foamy agave sour with bitters",
      "themes": [
        "tequila-sunday"
      ],
      "ingredients": "2 oz reposado | 1 oz lemon juice | 0.5 oz lime juice | 2 tsp agave nectar | 2 dashes Angostura bitters | 1 egg white | cherry and lime garnish",
      "availability": [
        "egg_white"
      ],
      "sort": 10,
      "imageFile": "tequila-sour.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "moscow-mule",
      "name": "Moscow Mule",
      "description": "Cold ginger standard that always gets ordered",
      "themes": [
        "the-usual-suspects",
        "spirit-vodka"
      ],
      "ingredients": "Vodka | lime or lime juice | ginger beer",
      "availability": [],
      "sort": 11,
      "imageFile": "moscow-mule.webp",
      "variations": [
        {
          "name": "Kentucky Mule",
          "change": "Swap vodka for bourbon"
        },
        {
          "name": "Mexican Mule",
          "change": "Swap vodka for tequila"
        },
        {
          "name": "Gin Mule",
          "change": "Swap vodka for gin"
        },
        {
          "name": "Strawberry Basil Mule",
          "change": "Add strawberry and basil to the mule"
        },
        {
          "name": "Blue Mule",
          "change": "Add blue curacao for a bright blue mule"
        },
        {
          "name": "Blackberry Mule with Elderflower",
          "change": "Add blackberry and elderflower for floral fruit notes"
        },
        {
          "name": "Cherry Mule",
          "change": "Add cherry flavor to the mule build"
        }
      ],
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "mojito",
      "name": "Mojito",
      "description": "Fresh mint lime crusher",
      "themes": [
        "the-usual-suspects",
        "spirit-rum"
      ],
      "ingredients": "White rum | fresh lime | sugar or simple syrup | mint leaves | club soda",
      "availability": [
        "mint"
      ],
      "sort": 12,
      "imageFile": "mojito.webp",
      "variations": [
        {
          "name": "Pineapple Mojito",
          "change": "Use pineapple variation"
        },
        {
          "name": "Strawberry Mojito",
          "change": "Use strawberry variation"
        },
        {
          "name": "Coconut Mojito",
          "change": "Use coconut variation"
        },
        {
          "name": "Frozen Mojito",
          "change": "Blend classic with ice"
        },
        {
          "name": "Blackberry Mojito",
          "change": "Add muddled blackberry for a darker fruit profile"
        },
        {
          "name": "Vodka Blueberry Mojito",
          "change": "Swap rum for vodka and add blueberries"
        }
      ],
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "french-75",
      "name": "French 75",
      "description": "Bubbly citrus classic with cognac bite",
      "themes": [
        "the-usual-suspects",
        "spirit-gin"
      ],
      "ingredients": "1.5 oz cognac | 0.75 oz lemon juice | 0.75 oz simple syrup | 1 oz champagne",
      "availability": [
        "champagne"
      ],
      "sort": 13,
      "imageFile": "french-75.webp",
      "variations": [
        {
          "name": "Gin French 75",
          "change": "Swap cognac for gin"
        },
        {
          "name": "Royal 75",
          "change": "Use Grand Marnier finish"
        }
      ],
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "spicy-frozen-pineapple-margarita",
      "name": "Spicy Frozen Pineapple Margarita",
      "description": "Frozen pineapple heat with tajin edge",
      "themes": [
        "cool-runnings"
      ],
      "ingredients": "Tequila | frozen pineapple | lime juice | agave | jalapeno blended in | blend with ice | tajin rim",
      "availability": [
        "jalapeno"
      ],
      "sort": 14,
      "imageFile": "spicy-frozen-pineapple-margarita.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "pina-colada",
      "name": "Pina Colada",
      "description": "Blended coconut pineapple pool classic",
      "themes": [
        "cool-runnings",
        "adult-swim"
      ],
      "ingredients": "6 oz light rum | 4 oz anejo rum | 6 oz cream of coconut | 6 oz pineapple juice | frozen pineapple | blend with ice",
      "availability": [],
      "sort": 15,
      "imageFile": "pina-colada.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "miami-vice",
      "name": "Miami Vice",
      "description": "Half strawberry daiquiri half pina colada split",
      "themes": [
        "cool-runnings"
      ],
      "ingredients": "0.5 strawberry daiquiri + 0.5 pina colada layered",
      "availability": [],
      "sort": 16,
      "imageFile": "miami-vice.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "frozen-coconut-mojito",
      "name": "Frozen Coconut Mojito",
      "description": "Blended mint-coconut rum slush",
      "themes": [
        "cool-runnings"
      ],
      "ingredients": "4 oz coconut rum | 4 oz cream of coconut | 2 oz lime juice | 8 mint leaves | blend with ice",
      "availability": [
        "mint"
      ],
      "sort": 17,
      "imageFile": "frozen-coconut-mojito.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "strawberry-frose",
      "name": "Strawberry Frose",
      "description": "Frozen rose strawberry crowd hit",
      "themes": [
        "cool-runnings"
      ],
      "ingredients": "1 bottle rose | 4 cups strawberries | 0.25 cup vodka | 2 tbsp lemon juice | blend with ice",
      "availability": [],
      "sort": 18,
      "imageFile": "strawberry-frose.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "painkiller",
      "name": "Painkiller",
      "description": "Dark rum pineapple coconut party lane",
      "themes": [
        "adult-swim",
        "spirit-rum"
      ],
      "ingredients": "2 oz dark rum | 4 oz pineapple juice | 1 oz orange juice | 1 oz cream of coconut | nutmeg garnish | orange or cherry garnish",
      "availability": [],
      "sort": 19,
      "imageFile": "painkiller.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "cherry-spritz",
      "name": "Cherry Spritz",
      "description": "Tart cherry spritz with prosecco lift",
      "themes": [
        "known-offenders",
        "spirit-spritz"
      ],
      "ingredients": "1 oz Aperol | 1 oz tart cherry juice | 0.5 oz lime juice | 0.5 oz grenadine | 3 oz prosecco | splash soda",
      "availability": [],
      "sort": 20,
      "imageFile": "cherry-spritz.webp",
      "isShot": false,
      "themeSortOverrides": {
        "known-offenders": 7,
        "spirit-spritz": 6
      }
    },
    {
      "id": "spicy-coconut-margarita",
      "name": "Spicy Coconut Margarita",
      "description": "Coconut-serrano margarita with lava salt bite",
      "themes": [
        "known-offenders"
      ],
      "ingredients": "2 oz tequila | 1 oz lime juice | 0.5 oz Cointreau | 0.25 oz simple syrup | 1 oz coconut cream | 0.5 serrano pepper | black lava salt rim",
      "availability": [
        "serrano"
      ],
      "sort": 21,
      "imageFile": "spicy-coconut-margarita.webp",
      "isShot": false,
      "themeSortOverrides": {
        "known-offenders": 2
      }
    },
    {
      "id": "sunny-afternoon",
      "name": "Sunny Afternoon",
      "description": "Strawberry-mint gin cooler with elderflower and ginger sparkle",
      "themes": [
        "known-offenders"
      ],
      "ingredients": "2 oz gin | 0.75 oz St. Germain | 0.75 oz lemon juice | 0.5 oz simple syrup | 0.75 oz strawberry puree | 5 mint leaves | top with ginger beer",
      "availability": [
        "mint"
      ],
      "sort": 107,
      "imageFile": "sunny-afternoon.webp",
      "variations": [
        {
          "name": "Good Afternoon",
          "change": "Add serrano for a brighter kick"
        }
      ],
      "isShot": false,
      "themeSortOverrides": {
        "known-offenders": 8
      }
    },
    {
      "id": "hot-smoky-mezcal-margarita",
      "name": "Hot and Smoky Mezcal Margarita",
      "description": "Smoky mezcal heat with bright citrus edge",
      "themes": [
        "tequila-sunday"
      ],
      "ingredients": "1.5 oz mezcal | 0.5 oz tequila | 0.75 oz lime juice | 0.5 oz orange liqueur | 0.25 oz agave | jalapeno slices | tajin rim",
      "availability": [
        "jalapeno"
      ],
      "sort": 22,
      "imageFile": "hot-smoky-mezcal-margarita.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "frozen-blue-margarita",
      "name": "Frozen Blue Margarita",
      "description": "Electric blue frozen margarita crowd favorite",
      "themes": [
        "cool-runnings"
      ],
      "ingredients": "2 oz tequila | 1 oz blue curacao | 1 oz lime juice | 0.5 oz agave | blend with ice",
      "availability": [],
      "sort": 23,
      "imageFile": "frozen-blue-margarita.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "frozen-coconut-margarita",
      "name": "Frozen Coconut Margarita",
      "description": "Frozen coconut margarita with creamy finish",
      "themes": [
        "cool-runnings"
      ],
      "ingredients": "2 oz tequila | 1 oz cream of coconut | 1 oz lime juice | 0.5 oz orange liqueur | blend with ice",
      "availability": [],
      "sort": 24,
      "imageFile": "frozen-coconut-margarita.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "pineapple-mint-daiquiri",
      "name": "Pineapple Mint Daiquiri",
      "description": "Frozen pineapple daiquiri with mint lift",
      "themes": [
        "cool-runnings"
      ],
      "ingredients": "2 oz white rum | 2 oz pineapple juice | 0.75 oz lime juice | 0.5 oz simple syrup | mint leaves | blend with ice",
      "availability": [
        "mint"
      ],
      "sort": 25,
      "imageFile": "pineapple-mint-daiquiri.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "old-fashioned",
      "name": "Old Fashioned",
      "description": "Spirit-forward classic with bitters and orange oil",
      "themes": [
        "the-usual-suspects",
        "spirit-whiskey"
      ],
      "ingredients": "2 oz bourbon or rye | 0.25 oz simple syrup | 2 dashes Angostura bitters | orange peel",
      "availability": [],
      "sort": 26,
      "imageFile": "old-fashioned.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "aperol-spritz",
      "name": "Aperol Spritz",
      "description": "Effortless sparkling spritz that always goes down easy",
      "themes": [
        "the-usual-suspects",
        "spirit-spritz"
      ],
      "ingredients": "3 oz prosecco | 2 oz Aperol | 1 oz soda water | orange slice",
      "availability": [],
      "sort": 27,
      "imageFile": "aperol-spritz.webp",
      "variations": [
        {
          "name": "Strawberry Aperol Spritz",
          "change": "Add strawberry-infused Aperol and a touch of lemon"
        }
      ],
      "isShot": false,
      "themeSortOverrides": {
        "spirit-spritz": 1
      }
    },
    {
      "id": "bloody-mary",
      "name": "Bloody Mary",
      "description": "Brunch legend with spice and savory backbone",
      "themes": [
        "the-usual-suspects"
      ],
      "ingredients": "2 oz vodka | 4 oz tomato juice | 0.5 oz lemon juice | Worcestershire | hot sauce | celery salt | black pepper | celery garnish",
      "availability": [],
      "sort": 28,
      "imageFile": "bloody-mary.webp",
      "variations": [
        {
          "name": "Spicy Bloody Mary",
          "change": "Turn up the heat with extra hot sauce and jalapeno"
        },
        {
          "name": "Smoky Bloody Mary",
          "change": "Swap vodka for mezcal for smoky depth"
        },
        {
          "name": "Green Bloody Mary",
          "change": "Use tomatillo/green mix and cilantro"
        }
      ],
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "alabazam",
      "name": "Alabazam",
      "description": "Cognac citrus cocktail with old-school charm",
      "themes": [
        "off-the-beaten-path"
      ],
      "ingredients": "1.5 oz cognac | 1 oz orange juice | 2 dashes bitters | 1 tsp simple syrup",
      "availability": [],
      "sort": 29,
      "imageFile": "alabazam.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "peruvian-elder-sour",
      "name": "Peruvian Elder Sour",
      "description": "Floral pisco sour riff with elderflower lift",
      "themes": [
        "off-the-beaten-path"
      ],
      "ingredients": "1.5 oz pisco | 0.5 oz elderflower liqueur | 0.75 oz lime juice | 0.5 oz simple syrup | 1 egg white",
      "availability": [
        "egg_white"
      ],
      "sort": 30,
      "imageFile": "peruvian-elder-sour.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "singapore-sling",
      "name": "Singapore Sling",
      "description": "Tropical gin classic with cherry and citrus",
      "themes": [
        "off-the-beaten-path",
        "spirit-gin"
      ],
      "ingredients": "1.5 oz gin | 0.5 oz cherry liqueur | 0.25 oz Benedictine | 0.25 oz Cointreau | 0.5 oz lime juice | pineapple juice | dash bitters",
      "availability": [],
      "sort": 31,
      "imageFile": "singapore-sling.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "division-bell",
      "name": "Division Bell",
      "description": "Smoky mezcal with maraschino and citrus balance",
      "themes": [
        "off-the-beaten-path"
      ],
      "ingredients": "1 oz mezcal | 0.75 oz Aperol | 0.5 oz maraschino liqueur | 0.75 oz lime juice",
      "availability": [],
      "sort": 33,
      "imageFile": "division-bell.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "red-headed-slut",
      "name": "Red-headed Slut",
      "description": "Quick peach-jager-cran hit",
      "themes": [
        "that-escalated-quickly"
      ],
      "ingredients": "0.33 oz peach schnapps | 0.5 oz Jager | 0.33 oz cranberry juice",
      "availability": [],
      "sort": 70,
      "imageFile": "shot-red-headed-slut.webp",
      "isShot": true,
      "themeSortOverrides": {}
    },
    {
      "id": "washington-apple",
      "name": "Washington Apple",
      "description": "Tart apple-crown-cran shot",
      "themes": [
        "that-escalated-quickly"
      ],
      "ingredients": "1 oz Crown | 1 oz sour apple schnapps | 1 oz cranberry juice",
      "availability": [],
      "sort": 71,
      "imageFile": "shot-washington-apple.webp",
      "isShot": true,
      "themeSortOverrides": {}
    },
    {
      "id": "red-snapper-shot",
      "name": "Red Snapper",
      "description": "Whiskey and amaretto with cranberry",
      "themes": [
        "that-escalated-quickly"
      ],
      "ingredients": "1 oz whiskey | 1 oz amaretto | 2 oz cranberry juice",
      "availability": [],
      "sort": 72,
      "imageFile": "shot-red-snapper.webp",
      "isShot": true,
      "themeSortOverrides": {}
    },
    {
      "id": "stop-light",
      "name": "Stop Light",
      "description": "Party shot trio with bright color hit",
      "themes": [
        "that-escalated-quickly"
      ],
      "ingredients": "3.5 shots vodka | cranberry | orange juice | melon liqueur",
      "availability": [],
      "sort": 73,
      "imageFile": "shot-stop-light.webp",
      "isShot": true,
      "themeSortOverrides": {}
    },
    {
      "id": "tequila-slammer",
      "name": "Tequila Slammer",
      "description": "Slam shot with soda finish",
      "themes": [
        "that-escalated-quickly"
      ],
      "ingredients": "1 oz tequila | 1 oz ginger ale or Sprite | pour and slam",
      "availability": [],
      "sort": 74,
      "imageFile": "shot-tequila-slammer.webp",
      "isShot": true,
      "themeSortOverrides": {}
    },
    {
      "id": "irish-car-bomb",
      "name": "Irish Car Bomb",
      "description": "Classic drop shot",
      "themes": [
        "that-escalated-quickly"
      ],
      "ingredients": "0.5 oz Jameson | 0.5 oz Bailey's | drop into Guinness",
      "availability": [],
      "sort": 75,
      "imageFile": "shot-irish-car-bomb.webp",
      "isShot": true,
      "themeSortOverrides": {}
    },
    {
      "id": "jager-bomb",
      "name": "Jager Bomb",
      "description": "Drop shot energy boost",
      "themes": [
        "that-escalated-quickly"
      ],
      "ingredients": "Shot of Jager | glass of Red Bull",
      "availability": [],
      "sort": 76,
      "imageFile": "shot-jager-bomb.webp",
      "isShot": true,
      "themeSortOverrides": {}
    },
    {
      "id": "vegas-bomb",
      "name": "Vegas Bomb",
      "description": "The loud one from the bombs lineup",
      "themes": [
        "that-escalated-quickly"
      ],
      "ingredients": "Shot of Crown | cranberry | peach schnapps | Red Bull | drop and drink",
      "availability": [],
      "sort": 77,
      "imageFile": "shot-vegas-bomb.webp",
      "isShot": true,
      "themeSortOverrides": {}
    },
    {
      "id": "nac-bomb",
      "name": "NAC Bomb",
      "description": "Cognac bomb variation",
      "themes": [
        "that-escalated-quickly"
      ],
      "ingredients": "Shot of Cognac | glass of Red Bull",
      "availability": [],
      "sort": 78,
      "imageFile": "shot-nac-bomb.webp",
      "isShot": true,
      "themeSortOverrides": {}
    },
    {
      "id": "flaming-dr-pepper",
      "name": "Flaming Dr Pepper",
      "description": "Fire-forward amaretto bomb",
      "themes": [
        "that-escalated-quickly"
      ],
      "ingredients": "0.75 shot amaretto | 0.25 shot 151 | light on fire | drop in beer",
      "availability": [],
      "sort": 79,
      "imageFile": "shot-flaming-dr-pepper.webp",
      "isShot": true,
      "themeSortOverrides": {}
    },
    {
      "id": "hurricane",
      "name": "Hurricane",
      "description": "Passion fruit rum classic with citrus and grenadine",
      "themes": [
        "spirit-rum"
      ],
      "ingredients": "2 oz light rum | 2 oz dark rum | 1 oz lime juice | 1 oz orange juice | 0.5 oz passion fruit puree | 0.5 oz simple syrup | splash grenadine",
      "availability": [],
      "sort": 80,
      "imageFile": "hurricane.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "rum-swizzle",
      "name": "Rum Swizzle",
      "description": "Tropical rum swizzle with bitters spice",
      "themes": [
        "spirit-rum"
      ],
      "ingredients": "3 oz dark rum | 3 oz white rum | 6 oz orange juice | 6 oz pineapple juice | 0.5 oz grenadine | 4 drops Angostura bitters",
      "availability": [],
      "sort": 81,
      "imageFile": "rum-swizzle.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "mai-tai",
      "name": "Mai Tai",
      "description": "Classic island build with rum, curacao, and citrus",
      "themes": [
        "spirit-rum"
      ],
      "ingredients": "1.5 oz light rum | 0.75 oz orange curacao | 0.75 oz lime juice | 1.5 oz pineapple juice | 0.5 oz orange juice | top with 0.5 oz dark rum",
      "availability": [],
      "sort": 82,
      "imageFile": "mai-tai.png",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "mint-julep",
      "name": "Mint Julep",
      "description": "Cold bourbon mint crusher",
      "themes": [
        "spirit-whiskey"
      ],
      "ingredients": "2 oz bourbon | 0.25 oz simple syrup | 8 mint leaves",
      "availability": [],
      "sort": 83,
      "imageFile": "mint-julep.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "boulevardier",
      "name": "Boulevardier",
      "description": "Whiskey negroni style with deep bitter balance",
      "themes": [
        "spirit-whiskey"
      ],
      "ingredients": "1.25 oz bourbon or rye | 1 oz Campari | 1 oz sweet vermouth",
      "availability": [],
      "sort": 84,
      "imageFile": "boulevardier.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "whiskey-sour",
      "name": "Whiskey Sour",
      "description": "Foamy whiskey sour with lemon snap",
      "themes": [
        "spirit-whiskey"
      ],
      "ingredients": "2 oz bourbon | 0.75 oz lemon juice | 0.75 oz simple syrup | egg white",
      "availability": [],
      "sort": 85,
      "imageFile": "whiskey-sour.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "whiskey-smash",
      "name": "Whiskey Smash",
      "description": "Muddled lemon mint bourbon smash",
      "themes": [
        "spirit-whiskey"
      ],
      "ingredients": "2 oz bourbon | 0.75 oz simple syrup | 3 lemon wedges muddled | 4 mint leaves | soda water",
      "availability": [],
      "sort": 86,
      "imageFile": "whiskey-smash.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "john-collins",
      "name": "John Collins",
      "description": "Bright tall collins with citrus and soda",
      "themes": [
        "spirit-gin",
        "spirit-whiskey"
      ],
      "ingredients": "2 oz bourbon or gin | 0.75 oz simple syrup | 1 oz lemon juice | 4 oz soda water | lemon or cherry garnish",
      "availability": [],
      "sort": 87,
      "imageFile": "john-collins.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "blackberry-bourbon-smash",
      "name": "Blackberry Bourbon Smash",
      "description": "Blackberry mint bourbon smash",
      "themes": [
        "spirit-whiskey"
      ],
      "ingredients": "2 oz bourbon | 0.25 lime | 8 blackberries | 5 mint leaves | 0.5 oz simple syrup | soda water",
      "availability": [],
      "sort": 88,
      "imageFile": "blackberry-bourbon-smash.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "bay-breeze",
      "name": "Bay Breeze",
      "description": "Cranberry pineapple vodka refresher",
      "themes": [
        "spirit-vodka"
      ],
      "ingredients": "2 oz vodka | 2 oz pineapple juice | 2 oz cranberry juice | orange or cherry garnish",
      "availability": [],
      "sort": 89,
      "imageFile": "bay-breeze.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "white-russian",
      "name": "White Russian",
      "description": "Creamy coffee vodka classic",
      "themes": [
        "spirit-vodka"
      ],
      "ingredients": "2 oz vodka | 2 oz coffee liqueur | 2 oz heavy cream",
      "availability": [],
      "sort": 90,
      "imageFile": "white-russian.png",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "wisecrack-fizz",
      "name": "Wisecrack Fizz",
      "description": "Pisco elderflower grapefruit fizz",
      "themes": [
        "spirit-liqueurs",
        "spirit-gin"
      ],
      "ingredients": "1.5 oz pisco | 1 oz elderflower liqueur | 1 oz grapefruit juice | 0.5 oz lemon juice | top with soda water",
      "availability": [],
      "sort": 91,
      "imageFile": "wisecrack-fizz.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "pisco-punch",
      "name": "Pisco Punch",
      "description": "Pisco pineapple punch with orange bitters",
      "themes": [
        "spirit-liqueurs",
        "spirit-gin"
      ],
      "ingredients": "2 oz pisco | 0.5 oz lemon juice | 1 oz simple syrup | muddled pineapple | 1 dash orange bitters",
      "availability": [],
      "sort": 92,
      "imageFile": "pisco-punch.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "negroni",
      "name": "Negroni",
      "description": "Equal parts bitter gin staple",
      "themes": [
        "spirit-gin"
      ],
      "ingredients": "1 part gin | 1 part Campari | 1 part sweet vermouth",
      "availability": [],
      "sort": 93,
      "imageFile": "negroni.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "coconut-pineapple-sour",
      "name": "Coconut and Pineapple Sour",
      "description": "Tropical gin sour with coconut water and egg white",
      "themes": [
        "spirit-gin"
      ],
      "ingredients": "gin | coconut water | lime juice | pineapple juice | agave syrup | 1 egg white",
      "availability": [
        "egg_white"
      ],
      "sort": 94,
      "imageFile": "coconut-pineapple-sour.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "dirty-martini",
      "name": "Dirty Martini",
      "description": "Olive brine martini with classic bite",
      "themes": [
        "spirit-martinis"
      ],
      "ingredients": "6 oz vodka | dash dry vermouth | 1 oz olive brine | green olives",
      "availability": [],
      "sort": 95,
      "imageFile": "dirty-martini.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "cosmopolitan",
      "name": "Cosmopolitan",
      "description": "Citrus cranberry martini mainstay",
      "themes": [
        "spirit-martinis"
      ],
      "ingredients": "2 oz vodka | 1 oz cranberry juice | 0.75 oz lime juice | 0.75 oz triple sec | orange twist",
      "availability": [],
      "sort": 96,
      "imageFile": "cosmopolitan.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "blue-sky",
      "name": "Blue Sky",
      "description": "Bright blue martini-style vodka build",
      "themes": [
        "spirit-martinis"
      ],
      "ingredients": "vodka | blue curacao | sweet vermouth | green olive or lemon",
      "availability": [],
      "sort": 97,
      "imageFile": "blue-sky.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "french-martini",
      "name": "French Martini",
      "description": "Pineapple Chambord vodka martini",
      "themes": [
        "spirit-martinis"
      ],
      "ingredients": "2 oz vodka | 1 oz pineapple juice | 0.5 oz Chambord",
      "availability": [],
      "sort": 98,
      "imageFile": "french-martini.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "lemon-drop-martini",
      "name": "Lemon Drop Martini",
      "description": "Bright lemon martini with sugared rim",
      "themes": [
        "spirit-martinis"
      ],
      "ingredients": "1.5 oz vodka | 0.5 oz Cointreau | 0.5 oz lemon juice | 1 tsp simple syrup | sugar rim | lemon twist",
      "availability": [],
      "sort": 99,
      "imageFile": "lemon-drop-martini.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "chocolate-martini",
      "name": "Chocolate Martini",
      "description": "Dessert martini with chocolate and cream",
      "themes": [
        "spirit-martinis"
      ],
      "ingredients": "2 to 4 oz vodka | 2 oz chocolate liqueur | 2 oz Baileys | 3 tbsp chocolate syrup | optional half and half",
      "availability": [],
      "sort": 100,
      "imageFile": "chocolate-martini.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "aphrodisiac-cosmo",
      "name": "Aphrodisiac Cosmo",
      "description": "Agavero-vodka cosmo riff",
      "themes": [
        "spirit-martinis"
      ],
      "ingredients": "2 oz Agavero | 2 oz vodka | splash cranberry | splash lime juice",
      "availability": [],
      "sort": 101,
      "imageFile": "aphrodisiac-cosmo.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "amalfi-martini",
      "name": "Amalfi Martini",
      "description": "Gin and limoncello martini with mint",
      "themes": [
        "spirit-gin",
        "spirit-martinis"
      ],
      "ingredients": "2 oz gin | 1.5 oz limoncello | 0.5 oz lemon juice | a few mint leaves",
      "availability": [],
      "sort": 102,
      "imageFile": "amalfi-martini.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "dragons-breath",
      "name": "Dragon's Breath",
      "description": "Smoky whiskey cocktail with St Germain and Cointreau",
      "themes": [
        "spirit-smoke",
        "spirit-whiskey"
      ],
      "ingredients": "2 oz bourbon | 1 tsp St Germain | 1 tsp Cointreau | 1 tsp simple syrup",
      "availability": [],
      "sort": 103,
      "imageFile": "dragons-breath.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "smoked-bramble-sour",
      "name": "Smoked Bramble Sour",
      "description": "Blackberry whiskey sour with smoke",
      "themes": [
        "spirit-smoke",
        "spirit-whiskey"
      ],
      "ingredients": "2 oz bourbon | 0.75 oz lemon juice | 1 oz simple syrup | 3 to 4 blackberries",
      "availability": [],
      "sort": 104,
      "imageFile": "smoked-bramble-sour.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "goblet-of-fire",
      "name": "Goblet of Fire",
      "description": "Bitters-forward smoked whiskey build",
      "themes": [
        "spirit-smoke",
        "spirit-whiskey"
      ],
      "ingredients": "2 oz bourbon or whiskey | 2 dashes bitters | 1 to 2 sugar cubes | orange peel",
      "availability": [],
      "sort": 105,
      "imageFile": "goblet-of-fire.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "smoked-old-fashioned",
      "name": "Smoked Old Fashioned",
      "description": "Old fashioned build with smoke and orange",
      "themes": [
        "spirit-smoke",
        "spirit-whiskey"
      ],
      "ingredients": "2 oz bourbon | 0.5 tsp sugar | 3 dashes Angostura bitters | 1 tsp water | orange peel",
      "availability": [],
      "sort": 106,
      "imageFile": "smoked-old-fashioned.webp",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "hugo-spritz",
      "name": "Hugo Spritz",
      "description": "Floral elderflower spritz with mint and soft citrus",
      "themes": [
        "spirit-spritz"
      ],
      "ingredients": "1.5 oz St. Elder | 2 mint leaves muddled | 3 to 5 oz prosecco | splash soda water | lime wheel",
      "availability": [
        "mint"
      ],
      "sort": 108,
      "imageFile": "hugo-spritz.webp",
      "variations": [
        {
          "name": "Blackberry Hugo",
          "change": "Add muddled blackberry for a darker berry-herbal version"
        }
      ],
      "isShot": false,
      "themeSortOverrides": {
        "spirit-spritz": 2
      }
    },
    {
      "id": "limoncello-spritz",
      "name": "Limoncello Spritz",
      "description": "Bright lemon spritz that feels like vacation plans",
      "themes": [
        "spirit-spritz"
      ],
      "ingredients": "2 oz limoncello | 3 oz prosecco | 1 oz soda water | lemon slice",
      "availability": [],
      "sort": 109,
      "imageFile": "limoncello-spritz.webp",
      "isShot": false,
      "themeSortOverrides": {
        "spirit-spritz": 3
      }
    },
    {
      "id": "campari-spritz",
      "name": "Campari Spritz",
      "description": "Bitter orange sparkle with a sharper aperitivo edge",
      "themes": [
        "spirit-spritz"
      ],
      "ingredients": "2 oz Campari | 3 oz prosecco | 1 oz soda water | orange slice",
      "availability": [],
      "sort": 110,
      "imageFile": "campari-spritz.webp",
      "isShot": false,
      "themeSortOverrides": {
        "spirit-spritz": 4
      }
    },
    {
      "id": "chambord-spritz",
      "name": "Chambord Spritz",
      "description": "Blackberry-leaning spritz with a playful berry pop",
      "themes": [
        "spirit-spritz"
      ],
      "ingredients": "1 oz Chambord blackberry liqueur | 3 oz white wine | 2 oz soda water | mint sprig | blackberry garnish",
      "availability": [],
      "sort": 111,
      "imageFile": "chambord-spritz.webp",
      "isShot": false,
      "themeSortOverrides": {
        "spirit-spritz": 5
      }
    },
    {
      "id": "dark-n-stormy",
      "name": "Dark n Stormy",
      "description": "Dark rum and ginger beer with the right amount of menace",
      "themes": [
        "spirit-rum"
      ],
      "ingredients": "2 oz dark rum | 0.5 oz lime juice | 4 oz ginger beer",
      "availability": [],
      "sort": 112,
      "imageFile": "dark-n-stormy.png",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "anejo-highball",
      "name": "Anejo Highball",
      "description": "Aged rum highball with citrus and bitters",
      "themes": [
        "spirit-rum"
      ],
      "ingredients": "1.5 oz aged rum | 0.5 oz triple sec | 0.25 oz lime juice | 2 dashes bitters | 4 oz ginger beer",
      "availability": [],
      "sort": 113,
      "imageFile": "anejo-highball.png",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "manhattan",
      "name": "Manhattan",
      "description": "Whiskey and vermouth nightcap energy",
      "themes": [
        "spirit-whiskey"
      ],
      "ingredients": "2 oz rye whiskey | 1 oz sweet vermouth | 2 dashes Angostura bitters | 1 maraschino cherry | orange twist",
      "availability": [],
      "sort": 114,
      "imageFile": "manhattan.png",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "long-island-iced-tea",
      "name": "Long Island Iced Tea",
      "description": "The classic that pretends to be casual and absolutely is not",
      "themes": [
        "the-usual-suspects"
      ],
      "ingredients": "0.5 oz gin | 0.5 oz vodka | 0.5 oz white rum | 0.5 oz tequila | 1 oz lemon juice | 1 oz simple syrup | 0.5 oz triple sec | splash of coke",
      "availability": [],
      "sort": 115,
      "imageFile": "long-island-iced-tea.png",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "french-connection",
      "name": "French Connection",
      "description": "Cognac and amaretto with smooth after-dinner swagger",
      "themes": [
        "spirit-liqueurs"
      ],
      "ingredients": "2 oz cognac | 1 oz amaretto | lemon or orange twist",
      "availability": [],
      "sort": 116,
      "imageFile": "french-connection.png",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "between-the-sheets",
      "name": "Between the Sheets",
      "description": "Cognac-rum-orange split with sharp citrus lift",
      "themes": [
        "spirit-liqueurs"
      ],
      "ingredients": "1 oz cognac | 1 oz light rum | 1 oz triple sec | 0.25 oz lemon juice | orange peel",
      "availability": [],
      "sort": 117,
      "imageFile": "between-the-sheets.png",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "fontainebleau-sidecar-cocktail",
      "name": "Fontainebleau Sidecar Cocktail",
      "description": "Agavero-kissed sidecar riff with a grand finish",
      "themes": [
        "spirit-liqueurs"
      ],
      "ingredients": "2 oz bourbon | 0.5 oz triple sec | 0.5 oz Agavero | float 1 tsp Grand Marnier",
      "availability": [],
      "sort": 118,
      "imageFile": "fontainebleau-sidecar-cocktail.png",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "clover-club",
      "name": "Clover Club",
      "description": "Agavero-club riff with egg white and grenadine",
      "themes": [
        "spirit-liqueurs"
      ],
      "ingredients": "1.5 oz gin | 1 egg | 0.5 oz Agavero | 2 tsp grenadine",
      "availability": [
        "egg_white"
      ],
      "sort": 119,
      "imageFile": "clover-club.png",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "pre-siesta",
      "name": "Pre Siesta",
      "description": "Aperol-tequila starter with orange bitters snap",
      "themes": [
        "tequila-sunday"
      ],
      "ingredients": "1.5 oz reposado tequila | 0.5 oz Aperol | 0.66 oz orange liqueur | 2 dashes orange bitters",
      "availability": [],
      "sort": 120,
      "imageFile": "pre-siesta.png",
      "isShot": false,
      "themeSortOverrides": {
        "tequila-sunday": 11
      }
    },
    {
      "id": "two-one-two",
      "name": "Two-One-Two",
      "description": "Grapefruit-heavy tequila and Aperol refresher",
      "themes": [
        "tequila-sunday"
      ],
      "ingredients": "2 oz reposado tequila | 1 oz Aperol | 2 oz grapefruit juice",
      "availability": [],
      "sort": 121,
      "imageFile": "two-one-two.png",
      "isShot": false,
      "themeSortOverrides": {
        "tequila-sunday": 12
      }
    },
    {
      "id": "cantarito",
      "name": "Cantarito",
      "description": "Citrus-loaded agave cooler with grapefruit soda pop",
      "themes": [
        "tequila-sunday"
      ],
      "ingredients": "2 oz tequila | 1 oz orange juice | 0.5 oz lemon juice | 0.5 oz lime juice | 1 pinch of salt | 4 oz grapefruit soda",
      "availability": [],
      "sort": 122,
      "imageFile": "cantarito.png",
      "isShot": false,
      "themeSortOverrides": {
        "tequila-sunday": 13
      }
    },
    {
      "id": "siesta-cocktail",
      "name": "Siesta Cocktail",
      "description": "Campari-tequila citrus riff with real backbone",
      "themes": [
        "tequila-sunday"
      ],
      "ingredients": "2 oz tequila blanco | 0.5 oz Campari | 0.5 oz grapefruit juice | 0.5 oz lime juice | 0.5 oz simple syrup | garnish with lemon or lime",
      "availability": [],
      "sort": 123,
      "imageFile": "siesta-cocktail.png",
      "isShot": false,
      "themeSortOverrides": {
        "tequila-sunday": 14
      }
    },
    {
      "id": "howlapeno",
      "name": "Howlapeno",
      "description": "Peach-pineapple tequila number with jalapeno bite",
      "themes": [
        "tequila-sunday"
      ],
      "ingredients": "1.5 oz blanco tequila | 0.25 oz peach syrup | 1 oz pineapple juice | lime soda | jalapenos",
      "availability": [
        "jalapeno"
      ],
      "sort": 124,
      "imageFile": "howlapeno.png",
      "isShot": false,
      "themeSortOverrides": {
        "tequila-sunday": 15
      }
    },
    {
      "id": "sour-cherry-margarita",
      "name": "Sour Cherry Margarita",
      "description": "Smoky cherry margarita with salted edge",
      "themes": [
        "tequila-sunday"
      ],
      "ingredients": "mezcal | orange liquor | cherry puree | smoked salt rim",
      "availability": [],
      "sort": 125,
      "imageFile": "sour-cherry-margarita.png",
      "isShot": false,
      "themeSortOverrides": {
        "tequila-sunday": 16
      }
    },
    {
      "id": "pineapple-daiquiri",
      "name": "Pineapple Daiquiri",
      "description": "Frozen pineapple daiquiri that keeps pool energy year-round",
      "themes": [
        "cool-runnings"
      ],
      "ingredients": "rum | frozen pineapples | pineapple juice (optional) | lime juice | simple syrup | blend with ice",
      "availability": [],
      "sort": 126,
      "imageFile": "pineapple-daiquiri.png",
      "isShot": false,
      "themeSortOverrides": {}
    },
    {
      "id": "kamikaze",
      "name": "Kamikaze",
      "description": "Clean citrus shot with zero patience",
      "themes": [
        "that-escalated-quickly"
      ],
      "ingredients": "0.5 oz vodka | 0.25 oz triple sec | 0.25 oz lime juice",
      "availability": [],
      "sort": 130,
      "imageFile": "shot-kamikaze.png",
      "isShot": true,
      "themeSortOverrides": {}
    },
    {
      "id": "lemon-drop-shot",
      "name": "Lemon Drop",
      "description": "Sugary citrus shot that lies about how easy it is",
      "themes": [
        "that-escalated-quickly"
      ],
      "ingredients": "1.5 oz vodka | sugar | lemon wedge",
      "availability": [],
      "sort": 131,
      "imageFile": "shot-lemon-drop.png",
      "isShot": true,
      "themeSortOverrides": {}
    },
    {
      "id": "water-moccasin",
      "name": "Water Moccasin",
      "description": "Peach-crown party shot with a little bite",
      "themes": [
        "that-escalated-quickly"
      ],
      "ingredients": "0.25 oz peach schnapps | 0.25 oz Crown | 0.25 oz triple sec | 0.25 oz sweet and sour",
      "availability": [],
      "sort": 132,
      "imageFile": "shot-water-moccasin.png",
      "isShot": true,
      "themeSortOverrides": {}
    },
    {
      "id": "melon-ball",
      "name": "Melon Ball",
      "description": "Melon-pineapple-vodka shot that goes down suspiciously fast",
      "themes": [
        "that-escalated-quickly"
      ],
      "ingredients": "0.25 oz melon liqueur | 0.25 oz pineapple juice | 0.5 oz vodka",
      "availability": [],
      "sort": 133,
      "imageFile": "shot-melon-ball.png",
      "isShot": true,
      "themeSortOverrides": {}
    },
    {
      "id": "pineapple-upside-down",
      "name": "Pineapple Upside Down",
      "description": "Cake-energy shot with pineapple and cherry",
      "themes": [
        "that-escalated-quickly"
      ],
      "ingredients": "0.75 oz vodka | 0.5 oz bourbon | 0.25 oz peach schnapps | 0.5 oz pineapple juice | splash of cherry juice | splash of grenadine",
      "availability": [],
      "sort": 134,
      "imageFile": "shot-pineapple-upside-down.png",
      "isShot": true,
      "themeSortOverrides": {}
    },
    {
      "id": "coconut-pineapple-shots",
      "name": "Coconut and Pineapple Shots",
      "description": "Tropical blue shot that looks way too harmless",
      "themes": [
        "that-escalated-quickly"
      ],
      "ingredients": "1 oz coconut rum | 1 oz pineapple juice | 0.5 oz blue curacao",
      "availability": [],
      "sort": 135,
      "imageFile": "shot-coconut-pineapple.png",
      "isShot": true,
      "themeSortOverrides": {}
    },
    {
      "id": "fire-up-my-pussy",
      "name": "Fire Up My P*ssy",
      "description": "Blue coconut-pineapple cream shot with zero subtlety",
      "themes": [
        "that-escalated-quickly"
      ],
      "ingredients": "1 oz blue curacao | 1 oz coconut rum | 1 oz pineapple juice | 1 oz Irish cream liqueur | ice | optional pineapple wedge or cherry garnish",
      "availability": [],
      "sort": 136,
      "imageFile": "shot-fire-up-my-pussy.png",
      "isShot": true,
      "themeSortOverrides": {}
    },
    {
      "id": "double-trouble-tropical-tequila-shots",
      "name": "Double Trouble Tropical Tequila Shots",
      "description": "Layered tropical tequila shot that arrives ready to cause problems",
      "themes": [
        "that-escalated-quickly"
      ],
      "ingredients": "Grenadine | pineapple juice | coconut rum | tequila",
      "availability": [],
      "sort": 137,
      "imageFile": "shot-double-trouble-tropical-tequila.png",
      "isShot": true,
      "themeSortOverrides": {}
    },
    {
      "id": "strawberry-limoncello-spritz",
      "name": "Strawberry Limoncello Spritz",
      "description": "Strawberry citrus spritz with a rosier vacation mood",
      "themes": [
        "spirit-spritz"
      ],
      "ingredients": "1 oz Empress 1908 Elderflower Rose Gin | 2 oz prosecco | 1 oz limoncello | 1 oz club soda | 0.5 oz strawberry syrup",
      "availability": [],
      "sort": 138,
      "imageFile": "strawberry-limoncello-spritz.png",
      "isShot": false,
      "themeSortOverrides": {
        "spirit-spritz": 8
      }
    },
    {
      "id": "blueberry-pineapple-tequila-sour",
      "name": "Blueberry Pineapple Tequila Sour",
      "description": "Bright pineapple tequila sour with a blueberry foam flex",
      "themes": [
        "tequila-sunday"
      ],
      "ingredients": "2 oz tequila | 1.5 oz pineapple juice | 0.75 oz lemon juice | 0.5 oz blueberry syrup | 1 egg white",
      "availability": [
        "egg_white"
      ],
      "sort": 139,
      "imageFile": "blueberry-pineapple-tequila-sour.png",
      "isShot": false,
      "themeSortOverrides": {
        "tequila-sunday": 17
      }
    },
    {
      "id": "lavender-spritz",
      "name": "Lavender Spritz",
      "description": "Floral purple spritz that looks like it belongs in a dramatic montage",
      "themes": [
        "spirit-spritz"
      ],
      "ingredients": "2 oz gin | 1 oz lavender syrup | 1 oz fresh lemon juice | 3 oz club soda | fresh lavender sprigs | ice",
      "availability": [],
      "sort": 140,
      "imageFile": "lavender-spritz.png",
      "isShot": false,
      "themeSortOverrides": {
        "spirit-spritz": 9
      }
    },
    {
      "id": "smoke-on-the-water",
      "name": "Smoke on the Water",
      "description": "Blackberry mezcal build with citrus and smoke drifting through it",
      "themes": [
        "tequila-sunday"
      ],
      "ingredients": "2 oz mezcal | 1 oz blackberry syrup | 0.75 oz fresh lemon juice | club soda | garnish",
      "availability": [],
      "sort": 141,
      "imageFile": "smoke-on-the-water.png",
      "isShot": false,
      "themeSortOverrides": {
        "tequila-sunday": 18
      }
    },
    {
      "id": "mezcalita",
      "name": "Mezcalita",
      "description": "Pineapple mezcal sour with ginger and lime making a very strong case for itself",
      "themes": [
        "tequila-sunday"
      ],
      "ingredients": "2 oz mezcal | 0.25 oz Cointreau | 2 oz pineapple juice | 0.5 oz ginger syrup | 0.25 oz fresh lime juice | pinch of salt or a few drops saline",
      "availability": [],
      "sort": 142,
      "imageFile": "mezcalita.png",
      "isShot": false,
      "themeSortOverrides": {
        "tequila-sunday": 19
      }
    },
    {
      "id": "pineapple-bourbon-lemonade",
      "name": "Pineapple Bourbon Lemonade",
      "description": "Bourbon lemonade with pineapple brightness and porch-energy swagger",
      "themes": [
        "spirit-whiskey"
      ],
      "ingredients": "Bourbon | pineapple juice | simple syrup | lemon juice",
      "availability": [],
      "sort": 143,
      "imageFile": "pineapple-bourbon-lemonade.png",
      "isShot": false,
      "themeSortOverrides": {
        "spirit-whiskey": 10
      }
    },
    {
      "id": "blue-hawaiian",
      "name": "Blue Hawaiian",
      "description": "Electric blue pineapple-coconut rum drink that looks like a pool day sounds",
      "themes": [
        "cool-runnings",
        "spirit-rum"
      ],
      "ingredients": "0.5 cup white rum | 0.5 cup blue curacao | 0.33 cup cream of coconut | 0.5 cup pineapple juice | 2 cups frozen pineapple | 2 cups ice optional",
      "availability": [],
      "sort": 144,
      "imageFile": "blue-hawaiian.png",
      "isShot": false,
      "themeSortOverrides": {
        "cool-runnings": 8,
        "spirit-rum": 9
      }
    },
    {
      "id": "hot-honey-aperol-spritz",
      "name": "Hot Honey Aperol Spritz",
      "description": "A little bitter, a little spicy, and exactly the kind of thing that turns into a second round",
      "themes": [
        "spirit-spritz"
      ],
      "ingredients": "Aperol | hot honey syrup | lemon juice | soda water | prosecco",
      "availability": [],
      "sort": 145,
      "imageFile": "hot-honey-aperol-spritz.png",
      "isShot": false,
      "themeSortOverrides": {
        "spirit-spritz": 10
      }
    },
    {
      "id": "coconut-spritz",
      "name": "Coconut Spritz",
      "description": "Coconut-lime spritz with bubbles and vacation brain",
      "themes": [
        "adult-swim",
        "spirit-spritz",
        "spirit-rum"
      ],
      "ingredients": "Coconut rum | coconut cream | lime juice | soda water | prosecco",
      "availability": [],
      "sort": 146,
      "imageFile": "coconut-spritz.png",
      "isShot": false,
      "themeSortOverrides": {
        "adult-swim": 6,
        "spirit-spritz": 11,
        "spirit-rum": 10
      }
    },
    {
      "id": "smoky-cucumber-spritz",
      "name": "Smoky Cucumber Spritz",
      "description": "Cool cucumber mint spritz with mezcal underneath the charm",
      "themes": [
        "tequila-sunday",
        "spirit-spritz",
        "spirit-smoke"
      ],
      "ingredients": "2 oz mezcal | 0.75 oz agave nectar | 0.75 oz lime juice | 2 slices cucumber | 8 mint leaves | club soda to top | mint sprig garnish",
      "availability": [
        "mint"
      ],
      "sort": 147,
      "imageFile": "smoky-cucumber-spritz.png",
      "isShot": false,
      "themeSortOverrides": {
        "tequila-sunday": 20,
        "spirit-spritz": 12,
        "spirit-smoke": 7
      }
    },
    {
      "id": "blueberry-lavender-spritz",
      "name": "Blueberry Lavender Spritz",
      "description": "Berry-floral spritz with a little twilight energy",
      "themes": [
        "spirit-spritz"
      ],
      "ingredients": "0.25 cup fresh blueberries | 1 oz elderflower liqueur | 0.75 oz lavender syrup | prosecco",
      "availability": [],
      "sort": 148,
      "imageFile": "blueberry-lavender-spritz.png",
      "isShot": false,
      "themeSortOverrides": {
        "spirit-spritz": 13
      }
    }
  ],
  "quotes": [
    {
      "text": "So let's sink another drink, 'Cause it'll give me time to think",
      "source": "Billy Idol",
      "location": "cover",
      "order": 1
    },
    {
      "text": "I feel sorry for people who do not drink. When they wake up in the morning, that is as good as they are going to feel all day.",
      "source": "Ernest Hemingway",
      "location": "cover",
      "order": 2
    },
    {
      "text": "Feel the rhythm Feel the rhyme Get on up it is bobsled time Cool Runnings",
      "source": "Cool Runnings",
      "location": "cool-runnings",
      "order": 3
    },
    {
      "text": "Beer is proof that God loves us and wants us to be happy.",
      "source": "Benjamin Franklin",
      "location": "cover",
      "order": 4
    },
    {
      "text": "I drink to make other people more interesting.",
      "source": "Ernest Hemingway",
      "location": "cover",
      "order": 5
    },
    {
      "text": "Here's to alcohol, the rose-colored glasses of life.",
      "source": "F. Scott Fitzgerald",
      "location": "cover",
      "order": 6
    },
    {
      "text": "Candy is dandy, but liquor is quicker.",
      "source": "Ogden Nash",
      "location": "cover",
      "order": 7
    }
  ]
} as const;
