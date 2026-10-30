export function lineKey(id, size = '', color = '') { return JSON.stringify([id,size,color]); }
export function addLine(cart, product, {size='',color='',quantity=1}={}) {
  const key=lineKey(product.id,size,color); const qty=Math.max(1,Math.min(99,Number(quantity)||1));
  const existing=cart.find(x=>x.key===key);
  return existing ? cart.map(x=>x.key===key?{...x,quantity:Math.min(99,x.quantity+qty)}:x) : [...cart,{key,id:product.id,size,color,quantity:qty}];
}
export function totals(cart, products) {
  return cart.reduce((a,line)=>{const p=products.find(p=>p.id===line.id);if(!p)return a; a.count+=line.quantity;if(p.price==null)a.unpriced+=line.quantity;else a.subtotal+=p.price*line.quantity;return a;},{count:0,subtotal:0,unpriced:0});
}
export function orderMessage(cart, products, details={}) {
  const items=cart.map(l=>{const p=products.find(p=>p.id===l.id);return p?`${l.quantity} × ${p.name}${l.size?` | Requested size: ${l.size}`:''}${l.color?` | Requested colour: ${l.color}`:''} | ${p.price==null?'Please quote':`$${p.price} each`}`:null}).filter(Boolean);
  const sum=totals(cart,products);
  return ['Hello House of Power! I would like to enquire about:',...items,`Items subtotal: $${sum.subtotal}${sum.unpriced?' + items requiring a quote':''}. Please confirm prices, stock and delivery.`,details.name?`Name: ${details.name}`:'',details.method?`Fulfilment: ${details.method}`:'',details.address?`Area / address: ${details.address}`:'',details.note?`Note: ${details.note}`:''].filter(Boolean).join('\n');
}
