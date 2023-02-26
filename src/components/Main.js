import SocialAccounts from "./SocialAccounts";
import SocialSkills from "./SocialSkills";

function Main() {
    return (
    <main className="App-main">
        <input name="firstname" />
        <input name="lastname" />

        {/* Multiple
        
        <output type="text"></output>
        <input type="text" list="social-skills" />
        <button>Add more</button>

        <datalist id="social-skills">
            <option>social</option>
            <option>fun</option>
            <option>coach</option>
        </datalist>
        
        */}

        <SocialSkills />



        {/* Multiple 
        
        <label>Enter one...</label>
        <input type="text" list="social-accounts" />
        <button>Add more</button>

        <datalist id="social-accounts">
            <option>Facebook</option>
            <option>Twitter</option>
            <option>LinkedIn</option>
        </datalist>
        */}
        

        <SocialAccounts />



    </main>
    );
  }
  
  export default Main;