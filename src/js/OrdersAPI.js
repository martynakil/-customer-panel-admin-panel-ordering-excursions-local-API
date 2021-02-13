

    class ordersAPI {
        constructor() {
           this.url = 'http://localhost:3005/orders'
        
        }
        
           saveOrder(item)  {
                const options = { 
                    method: 'POST',
                    body: JSON.stringify( item ),
                    headers: { 
                        'Content-Type': 'application/json'
                    } 
                };
        
                return this._fetch(options);

            }
        
            _fetch(options, additionalPath = '') {
                const url = this.url +  additionalPath;
                return fetch(url, options)
                    .then(resp => {
                        if(resp.ok) { return resp.json(); }
                        return Promise.reject(resp);
                    });
            }

    }

        

export default ordersAPI;