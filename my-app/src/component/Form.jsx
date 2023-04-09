import React,{useEffect,useState} from "react";
import styles from './Module.Form.css'
 
function Form(){
    const [inputValue,setInputValue]=useState({
        name:"",
        email:"",
        password:""

    });
    const [skills, setSkills] = useState([]);
    const [header,setHeader] = useState("Try it free 7 days then ₹180/mo. thereafter");
    const [active,setActive] = useState(false);
    const handleInput = (event) => {
        setInputValue({...inputValue,[event.target.name]:event.target.value});
    };

    const handleSkillsChange = (event) => {
        const selectedSkill = event.target.value;
        event.target.value = "";
        event.target.setCustomValidity("");
        if (selectedSkill && !skills.includes(selectedSkill)) {
          setSkills((prevSkills) => [...prevSkills, selectedSkill]);
        }
    }; 
    const handleRemoveSkill = (skillToRemove) => {
        setSkills((prevSkills) =>
          prevSkills.filter((skill) => skill !== skillToRemove)
        );
    };

    const isFormSubmit = ()=>{
        if (
            inputValue.name &&
            inputValue.email &&
            inputValue.password &&
            skills.length > 0
          ) {
              document.getElementById("sbutton").style.background = "green";
              return true;
        
          } 
          else {
            return false;
          }   
    }
    const claimTrail = (event)=>{
        event.preventDefault();
        if (!isFormSubmit()) {
          return;
        }
        setHeader("You have successfully subscribed to our plan");
        setInputValue({ name: "", email: "", password: "" });
        setSkills([]);
        document.getElementById("sbutton").style.background = "#B5B5B5";
        
    }

    useEffect(() => {
        setActive(skills.length > 0 && isFormSubmit());
    }, [skills, inputValue]);

    return(
        <div className="form">
            <div className="header">{header}</div>
            <form className="formbody" onSubmit={claimTrail}>
               <input type="text"
               name="name"
               value={inputValue.name} 
               placeholder="Name"
               onChange={handleInput}
               required
               />
               
               <input type="email"
               name="email"
               value={inputValue.email} 
               placeholder="Email"
               onChange={handleInput}
               required
               />
            
               <input type="password"
               name="password"
               value={inputValue.password} 
               placeholder="Password"
               onChange={handleInput}
               required
               />

              <select
              name="skills"
              className="formSelect"
              onChange={handleSkillsChange}
              >
                <option value="">Choose Skills</option>
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="JS">JS</option>
                <option value="REACT">REACT</option>
                <option value="NODE JS">NODE JS</option>
                <option value="MONGO DB">MONGO DB</option>
              </select>

              {skills && (
                <div className="skills">
                  {skills.map((skill) => {
                    return (
                      <div key={skill} className="skillTag">
                        {skill} &nbsp;
                        <span onClick={() => handleRemoveSkill(skill)}>X</span>
                    </div>
                   );
                  })}
                </div>
               )}
              <button type="submit" className="formButton" id="sbutton">CLAIM FREE TRAIL</button>

               <div className= "comment">
                   By clicking the button you are agreeing to our{" "}
                   <span>Terms and Services</span>
               </div>
            </form>
        </div>
    )
}
export default Form;