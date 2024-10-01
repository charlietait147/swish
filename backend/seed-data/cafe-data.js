const cafes = [
    {
        name: 'The Orangery',
        location: 'Winchester',
        description: 'The Orangery is a relaxed and sophisticated coffee, brunch and cocktail bar in the fashionable square right outside the Cathedral grounds.  Arguably its party piece is its rather stunning interior, decorated spaciously in a botanical theme, making this one of the nicest venues to sit in and socialise with friends.  For those seeking a hearty brunch in town, we\`d recommend their wonderfully presented poached egg and avocado on toast, complemented with a white hot chocolate!',
        website: 'https://www.thewinchesterorangery.com',
        image: 'the-orangery-cafe-no-border.jpeg',
        borderImage: 'the-orangery-cafe.jpeg',
        address: '11 The Square, Winchester, SO23 9ES',
        lat: 51.0622118,
        lng: -1.3178322,
        icons: [
            {
                type: 'Accessible by Public Transport',
                url: 'accessible-by-transport.jpeg'
            },
            {
                type: 'Hot Food Available',
                url: 'hot-food.jpeg',
            },
            {
                type: 'Takes Bookings',
                url: 'bookings.jpeg',
            }
        ],
        reviews: []
    },
    {
        name: 'Caracoli',
        location: 'New Alresford',
        description: 'Part of the Heidi family, Caracoli in Alresford is a charming café in the heart of the picturesque town of Alresford.  It is both a coffee shop and a food store, serving excellent coffee and tea, handmade cakes, savoury bakes and seasonal goodies, as well as specialist foods, local cheese, wine and cooking accessories.  Parking is available right outside on Broad Street for free (up to 2 hours) as well as a bus stop serving visitors from Alton and Winchester on Route 64.',
        website: 'https://www.caracoli.co.uk',
        image: 'caracoli-cafe-no-border.jpeg',
        borderImage: 'caracoli-cafe.jpeg',
        address: '15 Broad St, Alresford SO24 9AR',
        lat: 51.09106,
        lng: -1.16183,
        icons: [
            {
                type: 'Accessible by Public Transport',
                url: 'accessible-by-transport.jpeg'
            },
            {
                type: 'Dog Friendly',
                url: 'dog-friendly.jpeg',
            },
            {
                type: 'Onsite Parking',
                url: 'onsite-parking.jpeg',
            },
        ],
        reviews: []
    },
    {
        name: 'Josie\'s',
        location: 'Winchester',
        description: 'Josie\'s is a family-run cafe in the heart of Winchester. The cafe is open seven days a week and serves a range of delicious food and drinks. Josie\'s is the perfect place to relax and enjoy a coffee or a light lunch. The cafe is also available for private hire and is the perfect venue for a special occasion.',
        website: 'https://www.josieswinecoffee.com',
        image: 'josies-cafe-no-border.jpeg',
        borderImage: 'josies-cafe.jpeg',
        address: '28 Jewry St, Winchester SO23 8SA',
        lat: 51.065576,
        lng: -1.315485,
        icons: [
            {
                type: 'Accessible by Public Transport',
                url: 'accessible-by-transport.jpeg'
            },
            {
                type: 'Dog Friendly',
                url: 'dog-friendly.jpeg',
            },
            {
                type: 'Hot Food Available',
                url: 'hot-food.jpeg',
            }
        ],
        reviews: []
    },
    {
        name: 'Hoxton Bakehouse',
        location: 'Winchester',
        description: 'Hoxton Bakehouse is a family-run cafe in the heart of Winchester. The cafe is open seven days a week and serves a range of delicious food and drinks. Hoxton Bakehouse is the perfect place to relax and enjoy a coffee or a light lunch. The cafe is also available for private hire and is the perfect venue for a special occasion.',
        website: 'https://www.hoxtonbakehouse.com',
        image: 'hoxton-bakehouse-no-border.jpeg',
        borderImage: 'hoxton-bakehouse.jpeg',
        address: '40 Jewry St, Winchester SO23 8RY',
        lat: 51.06404,
        lng: -1.31587,
        icons: [
            {
                type: 'Accessible by Public Transport',
                url: 'accessible-by-transport.jpeg'
            },
            {
                type: 'Dog Friendly',
                url: 'dog-friendly.jpeg',
            }
        ],
        reviews: []
    },
    {
        name: 'The Yard',
        location: 'Alresford',
        description: 'The Yard is a charming rural café and event space located in the Candover Valley.  Based in the beautiful rural setting of a working farm, the café, purpose-built from an old barn, is the perfect venue for enjoying quality coffee and food in the Hampshire countryside.  Be weary that the location is inaccessible by public transport.  For those with transport, there is ample parking on the premises which is driveable from Basingstoke, Alresford or Winchester.',
        website: 'https://www.theyardhampshire.co.uk',
        image: 'the-yard-cafe-no-border.jpeg',
        borderImage: 'the-yard-cafe.jpeg',
        address: 'Chilton Manor Farm, Chilton Candover, Alresford, SO24 9TX',
        lat: 51.15907,
        lng: -1.15516,
        icons: [
            {
                type: 'Dog Friendly',
                url: 'dog-friendly.jpeg',
            },
            {
                type: 'Onsite Parking',
                url: 'onsite-parking.jpeg',
            },
            {
                type: 'Takes Bookings (6+)',
                url: 'bookings.jpeg',
            }
        ],
        reviews: []
    },
    {
        name: 'Kavi Coffee',
        location: 'Winchester',
        description: 'Kavi is a brand new concept café in central Winchester that opened its doors in May 2024.   The modern, spacious interior is stylish and sophisticated; flamingos can even be found on the lavatory walls.  For those seeking a classy café dining experience, Kavi could be the answer.  Of particular note is the consistency and quality of the coffee served, making this venue a favourite and one to rival only the very best in town.',
        website: "https://www.kavicoffee.com",
        image: 'kavi-no-border.jpeg',
        borderImage: 'kavi.jpeg',
        address: '12 Jewry St, Winchester SO23 8RZ',
        lat: 51.064408,
        lng: -1.31612,
        icons: [
            {
                type: 'Accessible by Public Transport',
                url: 'accessible-by-transport.jpeg'
            },
            {
                type: 'Hot Food Available',
                url: 'hot-food.jpeg',
            }
        ],
        reviews: []
    },
    {
        name: 'The South Downs Social',
        location: 'Winchester',
        description: 'Described as Winchester\'s most sociable café, Southdown Social is a popular, easy-going café in the heart of the city.  Whether arriving on two wheels or two feet, the venue is perfect for those seeking a freshly cooked breakfast or locally roasted coffee from the reputable Winchester Coffee Roasters.  Extra seating is available upstairs in the art studio and outside if the weather\'s nice, making this café one of Winchester\'s \`best people watching\` spots.',
        website: 'https://www.southdownssocial.com',
        image: 'south-downs-social-cafe-no-border.jpeg',
        borderImage: 'south-downs-social-cafe.jpeg',
        address: '3-4, Kings Walk, Middle Brook St, Winchester SO23 8AF',
        lat: 51.06253,
        lng: -1.31176,
        icons: [
            {
                type: 'Accessible by Public Transport',
                url: 'accessible-by-transport.jpeg'
            },
            {
                type: 'Dog Friendly',
                url: 'dog-friendly.jpeg',
            }
        ],
        reviews: []
    },
    {
        name: 'The Refectory',
        location: 'Winchester',
        description: 'The light and airy Refectory offers a fully stocked licensed bar, plenty of space for dancing, a pretty walled garden and amazing cathedral views.  Located in the heart of Winchester and adjacent to the Cathedral itself, the venue is the perfect food or coffee stop for those exploring the historic city.   Why not enjoy a stroll around the old town or Cathedral grounds before or after your visit?',
        website: 'https://www.winchester-cathedral.org.uk/welcome/cafe/',
        image: 'the-refectory-cafe-no-border.jpeg',
        borderImage: 'the-refectory-cafe.jpeg',
        address: 'Great Minster St, Winchester SO23 9HE',
        lat: 51.06097,
        lng: -1.31527,
        icons: [
            {
                type: 'Accessible by Public Transport',
                url: 'accessible-by-transport.jpeg'
            },
            {
                type: 'Dog Friendly',
                url: 'dog-friendly.jpeg',
            },
            {
                type: 'Hot Food Available',
                url: 'hot-food.jpeg',
            }
        ],
        reviews: []
    },
    {
        name: 'Heidi',
        location: 'Haslemere',
        description: 'Heidi is a family-run cafe in the heart of Haslemere. The cafe is open seven days a week and serves a range of delicious food and drinks. Heidi is the perfect place to relax and enjoy a coffee or a light lunch. The cafe is also available for private hire and is the perfect venue for a special occasion.',
        website: 'https://www.heidibakery.co.uk/locations/heidi-haslemere/',
        image: 'heidi.jpg',
        borderImage: '/',
        address: '27 High St, Haslemere GU27 2HG',
        lat: 51.08834,
        lng: -0.70925,
        icons: [
            {
                type: 'Accessible by Public Transport',
                url: 'accessible-by-transport.jpeg'
            },
            {
                type: 'Dog Friendly',
                url: 'dog-friendly.jpeg',
            },
            {
                type: 'Onsite Parking',
                url: 'onsite-parking.jpeg',
            }
        ],
        reviews: []
    },
    {
        name: 'The Handlebar Cafe',
        location: 'Winchester',
        description: 'Cadence at the Handlebar Café is a quirky, cycle-themed café nestled in the St Catherines Hill area of Winchester.  Conveniently located for cyclists and walkers, the café serves coffee, pastries and ice cream, and landmarks a useful start or finish point for those exploring Winchester’s countryside, either upwards to St Catherines Hill or along the riverbank towards St Cross and Winchester. ',
        website: 'https://www.handlebar.cafe',
        image: 'handle-bar-cafe-no-border.jpeg',
        borderImage: 'handle-bar-cafe.jpeg',
        address: 'Garnier Road Car Park, Winchester SO23 9PA',
        lat: 51.04940,
        lng: -1.31124,
        icons: [
            {
                type: 'Dog Friendly',
                url: 'dog-friendly.jpeg',
            },
            {
                type: 'Onsite Parking',
                url: 'onsite-parking.jpeg',
            }
        ],
        reviews: []
    },
    {
        name: 'Edison\'s Coffee and Wine',
        location: 'Southampton',
        description: 'Located near the High Street and within the Old Town in Southampton, Edison\'s offer freshly baked goods from a local supplier and a quality in coffee that\'s not always easy to come by in the chain-dominated city centre. Its high ceilings and bright interior create a spacious and versatile environment perfect for socialising over a coffee or small lunch. The location is perfect for visiting the Old Town or West Quay shopping centre.',
        website: 'https://edisons.life/',
        image: 'edisons-no-border.jpeg',
        borderImage: 'edisons.jpeg',
        address: '126 High St, Southampton SO14 2AA',
        lat: 50.89943,
        lng: -1.40396,
        icons: [
            {
                type: 'Accessible by Public Transport',
                url: 'accessible-by-transport.jpeg'
            },
            {
                type: 'Dog Friendly',
                url: 'dog-friendly.jpeg',
            },
            {
                type: 'Takes Bookings',
                url: 'bookings.jpeg',
            }
        ],
        reviews: []
    },
    {
        name: 'Coffee Diem',
        location: 'Farnham',
        description: 'Found in one of Farnham\'s most popular shopping streets, Coffee Diem is an Italian-themed coffee and lunch bar serving a wide selection of coffees, teas, shakes, soups, panini sandwiches, and homemade Italian pizza. During the warmer months ample seating is available outside, providing an alfresco dining experience for those who enjoy the hustle and bustle of a picturesque market town. Nearby attractions to consider afterwards include Farnham Castle and Frensham Great Pond, situated just south of the Surrey town.',
        website: 'https://coffeediemfarnham.co.uk/',
        image: 'coffee-diem-no-border.jpeg',
        borderImage: 'coffee-diem.jpeg',
        address: 'Unit 9, 24 Lion and Lamb Yard, Farnham GU9 7LL',
        lat: 51.21482,
        lng: -0.80134,
        icons: [
            {
                type: 'Accessible by Public Transport',
                url: 'accessible-by-transport.jpeg'
            },
            {
                type: 'Dog Friendly',
                url: 'dog-friendly.jpeg',
            },
            {
                type: 'Hot Food Available',
                url: 'hot-food.jpeg',
            },
            {
                type: 'Takes Bookings',
                url: 'bookings.jpeg',
            }
        ], 
        reviews: []
    },
    {
        name: 'Hemingways',
        location: 'Haslemere',
        website: 'https://hemingwaysofhaslemere.com/',
        description: 'Located in the heart of Haslemere, Hemingways is a quirky coffee shop perfect for those looking for a breakfast or brunch treat. An extensive menu is available offering breakfast, lunch, snacks and afternoon tea. The venue is a very short and scenic drive for those visiting the Devil\'s Punchbowl; why not start the morning here?',
        image: 'hemingways-no-border.jpeg',
        borderImage: 'hemingways.jpeg',
        address: '48 High St, Haslemere GU27 2LA',
        lat: 51.08875,
        lng: -0.70867,
        icons: [
            {
                type: 'Accessible by Public Transport',
                url: 'accessible-by-transport.jpeg'
            },
            {
                type: 'Dog Friendly',
                url: 'dog-friendly.jpeg',
            },
            {
                type: 'Hot Food Available',
                url: 'hot-food.jpeg',
            },
            {
                type: 'Takes Bookings',
                url: 'bookings.jpeg',
            }
        ],
        reviews: []
    },
    {
        name: 'Harris and Hoole',
        location: 'Farnham',
        website: 'https://www.harrisandhoole.co.uk/shop/farnham',
        description: 'Positioned on the corner of Farnham\'s charming Lion & Lamb Yard, this Harris & Hoole establishment is a spacious, two-storey café serving high quality, well-presented coffee and snacks. The venue boasts four choices for seating; downstairs, outside, upstairs, and on the terrace balcony. We\'d particularly recommend this café as a good spot for a date, or somewhere to recharge after a stroll around the nearby Frensham Great Pond.',
        image: 'harris-hoole-no-border.jpeg',
        borderImage: 'harris-hoole.jpeg',
        address: '113B West St, Lion and Lamb Yard, Farnham GU9 7HH',
        lat: 51.21444,
        lng: -0.80080,
        icons: [
            {
                type: 'Accessible by Public Transport',
                url: 'accessible-by-transport.jpeg'
            },
            {
                type: 'Dog Friendly',
                url: 'dog-friendly.jpeg',
            },
            {
                type: 'Takes Bookings',
                url: 'bookings.jpeg',
            }
        ],
        reviews: []
    },
    {
        name: 'Wild and Green Kitchen',
        location: 'Cranleigh',
        website: 'https://wildandgreenkitchen.co.uk/',
        description: 'Wild & Green Kitchen is an independent, artisan café serving high quality coffee and natural food. The venue is positioned with a wonderful view of Cranleigh High Street and is well worth a visit for those visiting the quaint Surrey village. During the summer season, we\'d recommend a takeaway from this venue and walking a few minutes to the Common, where cricket can sometimes be watched in peaceful surroundings.',
        image: 'wild-green-kitchen-no-border.jpeg',
        borderImage: 'wild-green-kitchen.jpeg',
        address: '180 High St, The Common, Cranleigh GU6 8RG',
        lat: 51.14200,
        lng: -0.49286,
        icons: [
            {
                type: 'Accessible by Public Transport',
                url: 'accessible-by-transport.jpeg'
            },
            {
                type: 'Dog Friendly',
                url: 'dog-friendly.jpeg',
            },
            {
                type: 'Takes Bookings',
                url: 'bookings.jpeg',
            }
        ],
        reviews: []
    },
    {
        name: 'Lilly\'s Tea and Coffee House',
        location: 'Wickham',
        website: 'https://livelifelovecake.com/lillys-tea-coffee-house-wickham-hampshire/',
        description: 'Lilly\'s is a charming café located in the heart of Wickham on the corner of The Square. Its mismatched furniture, unusual ornaments and traditional crockery give the venue a homely feel akin to being at Granny’s. The popular venue offers a variety of savoury snacks and sandwiches as well as a modest selection of hot lunches, making it the perfect excuse to venture out to the very attractive village of Wickham.',
        image: 'lillys-no-border.jpeg',
        borderImage: 'lillys.jpeg',
        address: 'The Square, Wickham, Fareham PO17 5JT',
        lat: 50.90026,
        lng: -1.18712,
        icons: [
            {
                type: 'Dog Friendly',
                url: 'dog-friendly.jpeg',
            },
            {
                type: 'Onsite Parking',
                url: 'onsite-parking.jpeg',
            },
            {
                type: 'Hot Food Available',
                url: 'hot-food.jpeg',
            },
            {
                type: 'Takes Bookings',
                url: 'bookings.jpeg',
            }
        ],
        reviews: []
    },
    {
        name: 'The Bumblebee Cafe',
        location: 'Rowland\'s Castle',
        website: 'https://www.thebumblebeecafe.co.uk/',
        description: 'The Bumblebee Café is a traditional village cafe, nestled right next to the village green of Rowlands Castle. In the heart of the picturesque village, its décor is bright and perfect for enjoying a quintessentially English lunch or afternoon tea. Although the village is somewhat remote, the café is located very close to its railway station; a small stop on the London to Portsmouth main line. Why not break up the journey and pay a visit to this hidden gem?',
        image: 'bumblebee-cafe-no-border.jpeg',
        borderImage: 'bumblebee-cafe.jpeg',
        address: '2 The Green, Rowland\s Castle PO9 6BN',
        lat: 50.89115,
        lng: -0.95829,
        icons: [
            {
                type: 'Accessible by Public Transport',
                url: 'accessible-by-transport.jpeg'
            },
            {
                type: 'Dog Friendly',
                url: 'dog-friendly.jpeg',
            },
            {
                type: 'Hot Food Available',
                url: 'hot-food.jpeg',
            },
            {
                type: 'Takes Bookings',
                url: 'bookings.jpeg',
            },
        ],
        reviews: []
    },
    {
        name: 'The Pavilion Tea Room',
        location: 'Rowland\'s Castle',
        website: 'https://www.paviliontearoom.co.uk/',
        description: 'Hidden within 1800 acres of ancient woodland on the Hampshire and West Sussex border, Stansted Park, with its stunning stately home and forest, is a wonderful setting for family and friends to gather. In the heart of The Walled Garden is a beautifully restored Victorian glass house, which now houses The Pavilion Tearoom. General bookings are not accepted but to enjoy the venue\'s esteemed afternoon tea (after 3:30pm), customers are required to book slots.',
        image: 'pavilion-tea-room-no-border.jpeg',
        borderImage: 'pavilion-tea-room.jpeg',
        address: 'Stansted House, Rowlands Castle, Rowland\s Castle PO9 6DU',
        lat: 50.88737,
        lng: -0.91899,
        icons: [
            {
                type: 'Hot Food Available',
                url: 'hot-food.jpeg',
            },
            {
                type: 'Onsite Parking',
                url: 'onsite-parking.jpeg',
            },
        ],
        reviews: []
    },
    {
        name: 'No. 60 Coffee and Wine Bar',
        location: 'Bishop\'s Waltham',
        website: '',
        description: 'This intriguing coffee and wine bar is a family run, lively shop offering a continental feel, serving light breakfast, lunch and evening snacks. A wide selection of drinks are available including local artisan coffee, speciality teas and a good selection of wines and beers. The venue marks a perfect spot for those visiting or passing through the quiet Hampshire town.',
        image: 'no-60-no-border.jpeg',
        borderImage: 'no-60.jpeg',
        address: '60 High St, Bishop/s Waltham, Southampton SO32 1AB',
        lat: 50.95482,
        lng: -1.21220,
        icons: [
            {
                type: 'Dog Friendly',
                url: 'dog-friendly.jpeg',
            },
            {
                type: 'Takes Bookings',
                url: 'bookings.jpeg',
            }
        ],
        reviews: []
    },
    {
        name: 'The Natural Food Deli',
        location: 'Petersfield',
        website: 'https://www.thenaturalfooddeli.co.uk/',
        description: 'The Natural Food Deli is a health food café and restaurant to be found in the heart of the South Downs in the old town of Petersfield. It offers a range of healthy food options and caters particularly well for vegetarian and vegan customers. It is conveniently based between the town centre and Petersfield Lake – easily walkable to both – making it suitable for those visiting the market town as well as those heading out for waterside strolling or bathing. If dining in, customers can enjoy an interesting interior floorplan decorated with a vintage, rustic style.',
        image: 'natural-food-deli-no-border.jpeg',
        borderImage: 'natural-food-deli.jpeg',
        address: '2 Dragon St, Petersfield GU31 4JD',
        lat: 51.00354,
        lng: -0.93440,
        icons: [
            {
                type: 'Accessible by Public Transport',
                url: 'accessible-by-transport.jpeg'
            },
            {
                type: 'Dog Friendly',
                url: 'dog-friendly.jpeg',
            },
            {
                type: 'Hot Food Available',
                url: 'hot-food.jpeg',
            },
            {
                type: 'Takes Bookings',
                url: 'bookings.jpeg',
            }
        ],
        reviews: []
    },
    {
        name: 'Baffled Coffee',
        location: 'Portsmouth',
        website: 'https://baffledcoffee.com/',
        description: 'Feeling baffled on the beachfront? This buzzing venue is the perfect hang-out for anyone seeking delicious homemade food and speciality coffee in the Portsmouth and Southsea area. Its relatively small interior give this well-reviewed place a cosy vibe, making it the perfect escape on a rainy day to socialise or cuddle up with a book. Nearby attractions include Portsmouth Historic Dockyard, the Spinnaker Tower and Gunwharf Quays outlet shopping centre. ',
        image: 'baffled-coffee-no-border.jpg',
        borderImage: 'baffled-coffee.jpg',
        address: '77 Fawcett Rd, Southsea, Portsmouth, Southsea PO4 0DB',
        lat: 50.79387,
        lng: -1.07625,
        icons: [
            {
                type: 'Accessible by Public Transport',
                url: 'accessible-by-transport.jpeg'
            },
            {
                type: 'Dog Friendly',
                url: 'dog-friendly.jpeg',
            },
            {
                type: 'Hot Food Available',
                url: 'hot-food.jpeg',
            },
            {
                type: 'Takes Bookings',
                url: 'bookings.jpeg',
            }
        ],
        reviews: []
    },
    {
        name: 'Bisque Coffee',
        location: 'Southampton',
        website: 'http://bisquecoffee.co.uk/',
        description: 'Bisque is an independent coffee shop nestled in Old Town Southampton, with a focus on creating a productive workspace. A variety of workspaces are organised within the venue including communal tables, individual desks and soft lounge-style seating areas for relaxed brainstorming sessions. Beyond coffee, a delightful selection of pastries, sandwiches and sweet treats are also available. For those visiting Southampton for work purposes, we highly recommend paying this venue a visit.',
        image: 'bisque-coffee-no-border.jpg',
        borderImage: 'bisque-coffee.jpg',
        address: 'Unit 2, 117 High St, Southampton SO14 2AA',
        lat: 50.89839,
        lng: -1.40409,
        icons: [
            {
                type: 'Accessible by Public Transport',
                url: 'accessible-by-transport.jpeg'
            },
            {
                type: 'Takes Bookings',
                url: 'bookings.jpeg',
            }
        ],
        reviews: [],  
    },
    {
        name: 'Fego Restaurant Cobham',
        location: 'Cobham',
        website: 'https://hellofego.com/',
        description: 'Fego is the ultimate neighbourhood café serving artisan coffee and cakes, plus imaginative breakfast and lunch offerings. From breakfast classics to fabulous lunch food, Fego balances the fresh and healthy approach with indulgence, making it the perfect feel-good setting for a social catch-up. For anyone living in or visiting Cobham, we’d highly recommend this venue.',
        image: 'fego-restaurant-cobham-no-border.jpg',
        borderImage: 'fego-restaurant-cobham.jpg',
        address: '14 Anyards Rd, Cobham KT11 2JZ',
        lat: 51.32963,
        lng: -0.41062,
        icons: [
            {
                type: 'Accessible by Public Transport',
                url: 'accessible-by-transport.jpeg'
            },
            {
                type: 'Dog Friendly',
                url: 'dog-friendly.jpeg',
            },
            {
                type: 'Hot Food Available',
                url: 'hot-food.jpeg',
            },
        ],
        reviews: []
    },
    {
        name: 'Hummings',
        location: 'Esher',
        website: 'https://www.hummings.co.uk/',
        description: 'Located in the heart of Esher, Hummings is a café by day and a bar by night. With its contemporary design, intimate open-air terrace and relaxed, upbeat atmosphere, the place has become a destination-venue, attracting both locals and visitors alike. Why not pay a visit to discover their stunning selection of healthy brunch and lunch choices, smoothies, coffees and cakes? While walk-ins are welcome, we recommend booking at weekends for brunch and lunch in order to secure a table, owing to the popularity of the place!',
        image: 'hummings-no-border.jpg',
        borderImage: 'hummings.jpg',
        address: '51 High St, Esher KT10 9RQ',
        lat: 51.36988,
        lng: -0.36461,
        icons: [
            {
                type: 'Accessible by Public Transport',
                url: 'accessible-by-transport.jpeg'
            },
            {
                type: 'Dog Friendly',
                url: 'dog-friendly.jpeg',
            },
            {
                type: 'Hot Food Available',
                url: 'hot-food.jpeg',
            },
            {
                type: 'Takes Bookings',
                url: 'bookings.jpeg',
            }
        ],
        reviews: []
    },
    {
        name: 'Pinnock\'s Coffee House',
        location: 'Ripley',
        website: 'https://pinnocks.coffee/',
        description: 'Located centrally in the pretty Surrey village of Ripley, Pinnock’s is a truly independent business. Its emphasis is on freshly made quality home cooked food and cakes, sourcing these only from county-local suppliers. With eight different beans to choose from, their coffee is also roasted locally using the drip-method, or for those less fanatical about coffee, a selection of 16 loose leaf teas are available, hand blended by local tea artisans Bergamia in Dorking. Whether looking for a light lunch or a place to relax and socialise over a brew, you’re sure to be delighted by this venue!',
        image: 'pinnocks-coffee-house-no-border.jpg',
        borderImage: 'pinnocks-coffee-house.jpg',
        address: 'Pinnocks, High St, Ripley, Woking GU23 6AF',
        lat: 51.29992,
        lng: -0.49319,
        icons: [
            {
                type: 'Dog Friendly',
                url: 'dog-friendly.jpeg',
            },
            {
                type: 'Hot Food Available',
                url: 'hot-food.jpeg',
            },
            {
                type: 'Takes Bookings',
                url: 'bookings.jpeg',
            }
        ],
        reviews: []
    }
]

export default cafes;