export interface Order {
  id: string;
  restaurantName: string;
  restaurantAddress: string;
  customerAddress: string;
  deliveryTime: number;
  foodReady: boolean;
  earnings: number;
  merchantOrderTime: string;
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
    earnings: 7.61,
    merchantOrderTime: '03-27 16:33',
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
    earnings: 7.02,
    merchantOrderTime: '03-27 17:32',
    status: 'new',
  },
  {
    id: '3',
    restaurantName: 'Fan Northeast Traditional Bento',
    restaurantAddress: '10 Dunton Road, Southwark, London, SE1 5TJ, United Kingdom',
    customerAddress: '84, Alie Street, Tower Hamlets, London, England, United Kingdom E1 8QB',
    deliveryTime: 25,
    foodReady: true,
    earnings: 7.48,
    merchantOrderTime: '03-27 19:06',
    incentive: {
      type: 'platform',
      amount: 2.14,
    },
    status: 'new',
  },
];

export const mockPickupOrders: Order[] = [];
export const mockDeliveringOrders: Order[] = [];
