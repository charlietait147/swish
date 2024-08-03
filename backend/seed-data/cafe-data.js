const cafes = [
    {
        name: 'The Orangery',
        location: 'Winchester',
        description: 'The Orangery is a relaxed and sophisticated coffee, brunch and cocktail bar in the fashionable square right outside the Cathedral grounds.  Arguably its party piece is its rather stunning interior, decorated spaciously in a botanical theme, making this one of the nicest venues to sit in and socialise with friends.  For those seeking a hearty brunch in town, we\`d recommend their wonderfully presented poached egg and avocado on toast, complemented with a white hot chocolate!',
        website: 'https://www.thewinchesterorangery.com',
        image: 'the-orangery-cafe-no-border.jpeg',
        borderImage: 'the-orangery-cafe.jpeg',
        lat: 51.0622118,
        lng: -1.3178322,
        reviews: []
    },
    {
        name: 'Caracoli',
        location: 'New Alresford',
        description: 'Part of the Heidi family, Caracoli in Alresford is a charming café in the heart of the picturesque town of Alresford.  It is both a coffee shop and a food store, serving excellent coffee and tea, handmade cakes, savoury bakes and seasonal goodies, as well as specialist foods, local cheese, wine and cooking accessories.  Parking is available right outside on Broad Street for free (up to 2 hours) as well as a bus stop serving visitors from Alton and Winchester on Route 64.',
        website: 'https://www.caracoli.co.uk',
        image: 'caracoli-cafe-no-border.jpeg',
        borderImage: 'caracoli-cafe.jpeg',
        lat: 51.0629061,
        lng: -1.3184552,
        reviews: []
    },
    {
        name: 'Josie\'s',
        location: 'Winchester',
        description: 'Josie\'s is a family-run cafe in the heart of Winchester. The cafe is open seven days a week and serves a range of delicious food and drinks. Josie\'s is the perfect place to relax and enjoy a coffee or a light lunch. The cafe is also available for private hire and is the perfect venue for a special occasion.',
        website: 'https://www.josieswinecoffee.com',
        image: 'josies-cafe-no-border.jpeg',
        borderImage: 'josies-cafe.jpeg',
        lat: 51.0652274,
        lng: -1.3182397,
        reviews: []
    },
    {
        name: 'Hoxton Bakehouse',
        location: 'Winchester',
        description: 'Hoxton Bakehouse is a family-run cafe in the heart of Winchester. The cafe is open seven days a week and serves a range of delicious food and drinks. Hoxton Bakehouse is the perfect place to relax and enjoy a coffee or a light lunch. The cafe is also available for private hire and is the perfect venue for a special occasion.',
        website: 'https://www.hoxtonbakehouse.com',
        image: 'hoxton-bakehouse-no-border.jpeg',
        borderImage: 'hoxton-bakehouse.jpeg',
        lat: 51.0646113,
        lng: -1.3218967,
        reviews: []
    },
    {
        name: 'The Yard',
        location: 'Alresford',
        description: 'The Yard is a charming rural café and event space located in the Candover Valley.  Based in the beautiful rural setting of a working farm, the café, purpose-built from an old barn, is the perfect venue for enjoying quality coffee and food in the Hampshire countryside.  Be weary that the location is inaccessible by public transport.  For those with transport, there is ample parking on the premises which is driveable from Basingstoke, Alresford or Winchester.',
        website: 'https://www.theyardhampshire.co.uk',
        image: 'the-yard-cafe-no-border.jpeg',
        borderImage: 'the-yard-cafe.jpeg',
        lat: 51.1590548,
        lng: -1.1577642,
        reviews: []
    },
    {
        name: 'Kavi Coffee',
        location: 'Winchester',
        description: 'Kavi is a brand new concept café in central Winchester that opened its doors in May 2024.   The modern, spacious interior is stylish and sophisticated; flamingos can even be found on the lavatory walls.  For those seeking a classy café dining experience, Kavi could be the answer.  Of particular note is the consistency and quality of the coffee served, making this venue a favourite and one to rival only the very best in town.',
        website: "https://www.kavicoffee.com",
        image: 'kavi-no-border.jpeg',
        borderImage: 'kavi.jpeg',
        lat: 51.0640911,
        lng: -1.3187711,
        reviews: []

    },
    {
        name: 'The South Downs Social',
        location: 'Winchester',
        description: 'Described as Winchester\'s most sociable café, Southdown Social is a popular, easy-going café in the heart of the city.  Whether arriving on two wheels or two feet, the venue is perfect for those seeking a freshly cooked breakfast or locally roasted coffee from the reputable Winchester Coffee Roasters.  Extra seating is available upstairs in the art studio and outside if the weather\'s nice, making this café one of Winchester\'s \`best people watching\` spots.',
        website: 'https://www.southdownssocial.com',
        image: 'south-downs-social-cafe-no-border.jpeg',
        borderImage: 'south-downs-social-cafe.jpeg',
        lat: 51.0625245,
        lng: -1.314337,
        reviews: []
    },
    {
        name: 'The Refectory',
        location: 'Winchester',
        description:'The light and airy Refectory offers a fully stocked licensed bar, plenty of space for dancing, a pretty walled garden and amazing cathedral views.  Located in the heart of Winchester and adjacent to the Cathedral itself, the venue is the perfect food or coffee stop for those exploring the historic city.   Why not enjoy a stroll around the old town or Cathedral grounds before or after your visit?',
        website: 'https://www.winchester-cathedral.org.uk/welcome/cafe/',
        image: 'the-refectory-cafe-no-border.jpeg',
        borderImage: 'the-refectory-cafe.jpeg',
        lat: 51.0609588,
        lng: -1.3178572,
        reviews: []
    },
    {
        name:'Heidi',
        location:'Haslemere',
        description: 'Heidi is a family-run cafe in the heart of Haslemere. The cafe is open seven days a week and serves a range of delicious food and drinks. Heidi is the perfect place to relax and enjoy a coffee or a light lunch. The cafe is also available for private hire and is the perfect venue for a special occasion.',
        website:'https://www.heidibakery.co.uk/locations/heidi-haslemere/',
        image: '/',
        borderImage: '/',
        lat: 51.0883346,
        lng: -0.7141268,
        reviews: []
    },
    {
        name: 'Naafi',
        location: 'Winchester',
        description: 'Naafi is a family-run cafe in the heart of Winchester. The cafe is open seven days a week and serves a range of delicious food and drinks. Naafi is the perfect place to relax and enjoy a coffee or a light lunch. The cafe is also available for private hire and is the perfect venue for a special occasion.',
        website: 'https://naafi.co.uk/winchester/',
        image: 'naafi-cafe-no-border.jpeg',
        borderImage: 'naafi-cafe.jpeg',
        lat: 51.0630357,
        lng: -1.3165779,
        reviews: []
    },
    {
        name: 'The Handlebar Cafe',
        location: 'Winchester',
        description: 'Cadence at the Handlebar Café is a quirky, cycle-themed café nestled in the St Catherines Hill area of Winchester.  Conveniently located for cyclists and walkers, the café serves coffee, pastries and ice cream, and landmarks a useful start or finish point for those exploring Winchester’s countryside, either upwards to St Catherines Hill or along the riverbank towards St Cross and Winchester. ',
        website: 'https://www.handlebar.cafe',
        image: 'handle-bar-cafe-no-border.jpeg',
        borderImage: 'handle-bar-cafe.jpeg',
        lat: 51.0493875,
        lng: -1.3137897,
        reviews: []
    }
]

export default cafes;