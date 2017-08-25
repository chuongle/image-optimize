/*global event*/
/*eslint no-restricted-globals: ["error", "event"]*/

// Respond to message from parent thread
self.addEventListener('message', function(event) { 
  console.log(event); 
});  
