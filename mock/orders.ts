export interface Order {
  id: string;
  restaurantName: string;
  restaurantAddress: string;
  customerAddress: string;
  deliveryTime: number;
  foodReady: boolean;
  merchantOrderTime: string;
  price: number;
  incentive?: {
    type: 'platform' | 'deadline';
    amount: number;
    deadline?: string;
  };
  status: 'new' | 'pickup' | 'delivering';
}

export const mockOrders: Order[] = [
  {
    id: '1',
    restaurantName: 'YOMI CAKE',
    restaurantAddress: '49 Cheshire Street, Tower Hamlets, London, E2 6EE, United Kingdom',
    customerAddress: '44 Newnton Close, Hackney, 伦敦, 英国 N4 2GX',
    deliveryTime: 39,
    foodReady: true,
    merchantOrderTime: '03-27 16:33',
    price: 4.50,
    incentive: {
      type: 'deadline',
      amount: 1.5,
      deadline: '17:48',
    },
    status: 'new',
  },
  {
    id: '2',
    restaurantName: 'heytea (Mayfair)',
    restaurantAddress: '10 Maddox Street, Westminster, London, W1S 1PF, United Kingdom',
    customerAddress: 'London E1W 2AH, UK e1w 2ah',
    deliveryTime: 35,
    foodReady: true,
    merchantOrderTime: '03-27 17:32',
    price: 3.25,
    status: 'new',
  },
  {
    id: '3',
    restaurantName: 'Fan Northeast Traditional Bento',
    restaurantAddress: '10 Dunton Road, Southwark, London, SE1 5TJ, United Kingdom',
    customerAddress: '84, Alie Street, Tower Hamlets, London, England, United Kingdom E1 8QB',
    deliveryTime: 25,
    foodReady: true,
    merchantOrderTime: '03-27 19:06',
    price: 7.48,
    incentive: {
      type: 'platform',
      amount: 2.14,
    },
    status: 'new',
  },
  {
    id: '4',
    restaurantName: 'Golden Dragon Chinese',
    restaurantAddress: '25 Gerrard Street, Chinatown, London, W1D 6JL',
    customerAddress: '15 Baker Street, Marylebone, London, W1U 3AH',
    deliveryTime: 28,
    foodReady: false,
    merchantOrderTime: '03-27 19:15',
    price: 5.60,
    status: 'new',
  },
  {
    id: '5',
    restaurantName: 'Sushi Express',
    restaurantAddress: '88 Wardour Street, Soho, London, W1F 0TH',
    customerAddress: '42 Oxford Street, Westminster, London, W1D 1BS',
    deliveryTime: 22,
    foodReady: true,
    merchantOrderTime: '03-27 19:20',
    price: 8.90,
    incentive: {
      type: 'platform',
      amount: 1.75,
    },
    status: 'new',
  },
];

export const mockPickupOrders: Order[] = [
  {
    id: 'p1',
    restaurantName: 'Bubble CiTea',
    restaurantAddress: '123 Oxford Street, London, W1D 2LG',
    customerAddress: '56 Regent Street, London, W1B 5SA',
    deliveryTime: 15,
    foodReady: true,
    merchantOrderTime: '03-27 18:45',
    price: 2.90,
    status: 'pickup',
  },
  {
    id: 'p2',
    restaurantName: 'Wagamama',
    restaurantAddress: '8 Leicester Square, London, WC2H 7NA',
    customerAddress: '22 Covent Garden, London, WC2E 8RF',
    deliveryTime: 20,
    foodReady: true,
    merchantOrderTime: '03-27 18:30',
    price: 6.45,
    status: 'pickup',
  },
];

export const mockDeliveringOrders: Order[] = [
  {
    id: 'd1',
    restaurantName: 'Pizza Express',
    restaurantAddress: '29 Wardour Street, London, W1D 6PS',
    customerAddress: '10 Downing Street, Westminster, London, SW1A 2AA',
    deliveryTime: 8,
    foodReady: true,
    merchantOrderTime: '03-27 18:15',
    price: 5.20,
    status: 'delivering',
  },
];
