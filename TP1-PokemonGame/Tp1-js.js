async function choosePokemon(pokemonName){
    // Ensure pokemonName is a string
      if (typeof pokemonName !== 'string') {
          throw new TypeError('pokemonName must be a string');
      }
      const response = await fetch(https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()});
  
  
     //here we are checking if the request is succesed , so if the status if our request is  the response status is between 200 and 299 (successful request), and false otherwise...
     console.log(response.status); 
     console.log(response.ok);
  
  
      //now lets retreive the data of our json file in the http request 
     //"await" The await keyword in JavaScript is used to pause the execution of an asynchronous function until a promise is resolved or rejected.
  
  
     //what is a promise then ? 
     //A Promise is a JavaScript object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. 
  
      const PokemonInfo = await response.json(); 
  
  
       console.log(PokemonInfo.abilities[0].ability.name);
  
       //now iv got the data
  
  return PokemonInfo; 
  
  }
  
  
  //so here we are going to let the boot choose one random move from allowed moves of its pookemon
  function BootChoice(AllowedMoves){
         //gonna shoose a random number to return 
      const randomIndex = Math.floor(Math.random() * AllowedMoves.length);
      return AllowedMoves[randomIndex].move;
  }
  
  
  async function movehitOrNohit(move)
  {
  
  
    
    const urldataresp = await fetch(move.url); // Fetch move details from its URL
    const urldata = await urldataresp.json();
  
      //so here the random is the one who will get if the move will hit or not 
      //that ine methode or we can just sit the accuracy of a move if its lower or higher than a number but here 
      //we care about move random behavior
  if(Math.random() < move.accuracy)
   {
      console.log(" its a hiiit congrats");
  
    urldata.pp--;
      return true;
   }else 
   {
      console.log("No hit  ");
   }
  return false;
  
  }
  
  
  async function attackAccured(attacker , defender , move) {
  
  
    const urldataresp = await fetch(move.move.url); // Fetch move details from its URL
    const urldata = await urldataresp.json();
  
  
      if (urldata.pp <= 0) {
          console.log(${attacker.name}'s ${move.move.name} is out of PP!);
          return;
        }
      
        if (movehitOrNohit()) {
          defender.hp -= urldata.power;
          urldata.pp--;
          console.log(${attacker.name} used ${move.move.name} on ${defender.name}! ${defender.name} now has ${defender.hp} HP.);
        } else {
          console.log(${attacker.name}'s ${move.move.name} missed!);
          urldata.pp--;
        }
  
      }
      async function battle(playerPokemon, botPokemon) {
          while (playerPokemon.hp > 0 && botPokemon.hp > 0) {
            console.log(\n${playerPokemon.name} HP: ${playerPokemon.hp});
            console.log(${botPokemon.name} HP: ${botPokemon.hp});
        
            console.log(\nYour turn! Choose a move for ${playerPokemon.name}:);
        
            // Display moves with fetched data
            for (const [index, move] of playerPokemon.moves.entries()) {
              const urldataresp = await fetch(move.move.url); // Fetch move details from its URL
              const urldata = await urldataresp.json();
        
              console.log(${index + 1}. ${move.move.name} (PP: ${urldata.pp}));
            }
        
            const choice = parseInt(prompt("Enter your move choice:")) - 1;
        
            if (choice < 0 || choice >= playerPokemon.moves.length) {
              console.log("Invalid choice. Please try again.");
              continue;
            }
        
            // Attack with selected move
            const selectedMove = playerPokemon.moves[choice];
            attackAccured(playerPokemon, botPokemon, selectedMove);
        
            if (botPokemon.hp <= 0) {
              break;
            }
        
            // Bot's turn to attack with a random move
            const botMove = BootChoice(botPokemon.moves);
            attackAccured(botPokemon, playerPokemon, botMove);
          }
        
          // End of battle results
          if (playerPokemon.hp > 0) {
            console.log(${playerPokemon.name} wins!);
          } else {
            console.log(${botPokemon.name} wins!);
          }
        }
        
    
        
  
  
  async function startGame() {
      const pokemonName = prompt("Choose your Pokemon:");
   
      // Check for null or empty string
      if (pokemonName === null) {
          console.error("User cancelled the prompt.");
          return;
      }
  
      // Trim the input and check if it's empty
      const trimmedName = pokemonName.trim();
      console.log("Trimmed Name Before Call:", trimmedName, "Type:", typeof trimmedName);
  
      if (trimmedName === "") {
          console.error("No Pokémon name entered.");
          return;
      }
  
      console.log("Chosen Pokemon Name:", trimmedName);
  
      const playerPokemon = await choosePokemon(trimmedName);
      playerPokemon.moves = playerPokemon.moves.map(move => move).slice(0, 5); 
      playerPokemon.hp = 300;
  
      const randomOpponentIndex = Math.floor(Math.random() * 800) + 1; // Generating random number for opponent
      const botPokemon = await choosePokemon(randomOpponentIndex.toString()); // Convert to string
      botPokemon.moves = botPokemon.moves.map(move => move).slice(0, 5); // Select first 5 moves
      botPokemon.hp = 300;
  
      battle(playerPokemon, botPokemon);
  }
  
  
    startGame();