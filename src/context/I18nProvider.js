import React, { createContext, Component,Fragment } from "react";
import i18n from 'i18n-js';
import * as Localization from 'expo-localization';

import { EN } from '../i18n/en';
import { ES } from '../i18n/es';

const I18nContext = createContext();

class I18nProvider extends Component {
    state = {
        lang:null,
    }
    componentDidMount(){
        console.log('antes', i18n.translations)
        
        i18n.translations = {
            
            en: EN,
            es: ES,
          };
          console.log('despues', i18n.translations)
          

        i18n.locale = String(Localization.locale).split('-')[0] ;
        i18n.fallbacks = true;
        this.setState({lang:String(Localization.locale).split('-')[0]})
        

      
    }
    componentDidUpdate() {
        console.log('[Provider componentDidUpdate]')
        

    }
    
    changeLang = (newLang) => {
        console.log('prov',newLang)
        i18n.locale = newLang.lang;
        i18n.fallbacks = true;
        this.setState({lang:newLang.lang})
        
     
    }

   

    render() {
      

        
        
            return(
                <Fragment>

                
                {(this.state.lang && i18n.translations) ?
                <I18nContext.Provider value={{
                    lang:this.state.lang,
                    changeLang: (newLang) => this.changeLang({lang:newLang})
                }}>
                    {this.props.children}
                </I18nContext.Provider>
                :null}
                </Fragment>
            )
        
      
        
    }


}

export default I18nProvider;
export {I18nContext}
