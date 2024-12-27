import input from "./inputPesquisa.module.css";


export default function InputPesquisa() {
    return (
      
  
       
        <div className={input.search}>
            <div className={input.search_box}>
                <div className={input.search_field}>
                    <input placeholder="Search..." className={input.input} type="text"/>
                    <div className={input.search_box_icon}>
                        <button className={input.btn_icon_content}>
                        <i className={input.search_icon}>
                           <img src="/lupa.svg"></img>
                        </i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
         
      
    );
  }
  