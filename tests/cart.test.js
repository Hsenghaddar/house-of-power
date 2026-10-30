import test from 'node:test';
import assert from 'node:assert/strict';
import {addLine,totals,orderMessage} from '../src/cart.js';
const products=[{id:'jacket',name:'Winter Puffer Jacket',price:75},{id:'shoe',name:'Nike Sports Shoes',price:null}];
test('same product and requested options merge while different sizes remain separate',()=>{
 let cart=addLine([],products[0],{size:'M',color:'Black',quantity:2});
 cart=addLine(cart,products[0],{size:'M',color:'Black'});
 cart=addLine(cart,products[0],{size:'L',color:'Black'});
 assert.equal(cart.length,2);assert.equal(cart[0].quantity,3);assert.equal(cart[1].quantity,1);
});
test('unpriced products remain visibly outside the advertised subtotal',()=>{
 const cart=addLine(addLine([],products[0],{quantity:2}),products[1],{quantity:3});
 assert.deepEqual(totals(cart,products),{count:5,subtotal:150,unpriced:3});
});
test('quantity is capped and invalid quantity cannot poison totals',()=>{
 assert.equal(addLine([],products[0],{quantity:1000})[0].quantity,99);
 assert.equal(addLine([],products[0],{quantity:'bad'})[0].quantity,1);
});
test('order enquiry includes requested variants, price quote and fulfilment details',()=>{
 const cart=addLine(addLine([],products[0],{size:'M',color:'Black'}),products[1]);
 const message=orderMessage(cart,products,{name:'Sam',method:'Delivery',address:'Ghazieh',note:'Check sizing'});
 assert.match(message,/Requested size: M/);assert.match(message,/Please quote/);assert.match(message,/\$75 \+ items requiring a quote/);assert.match(message,/Name: Sam/);assert.match(message,/Ghazieh/);assert.match(message,/confirm prices, stock and delivery/);
});
test('removed catalog records are ignored in totals and enquiry',()=>{
 const cart=[{id:'missing',quantity:3}];assert.deepEqual(totals(cart,products),{count:0,subtotal:0,unpriced:0});assert.doesNotMatch(orderMessage(cart,products),/undefined/);
});
test('prototype prices are identified as samples in outgoing enquiry text',()=>{
 const sample={id:'whey',name:'Whey Protein',price:45,prototype:true};
 const message=orderMessage(addLine([],sample),[sample]);
 assert.match(message,/Prototype selection — please confirm/);
 assert.match(message,/Sample \$45 each/);
 assert.doesNotMatch(message,/Advertised \$45 each/);
});
