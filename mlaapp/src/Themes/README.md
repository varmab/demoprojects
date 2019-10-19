### Themes Folder
Application specific themes
* ApplicationStyles
* Fonts
* Metrics
* Colors

Native Base Themes:
* pandavist/components (NativeBase components styles)
* pandavist/variables (Three main files)
    * commonColor: Color definitions for generic props of components
    * material: Material design implementation (not currently used)
    * platform: Platform-specific theming

##### The current implementation of theming for Pandavist is as follows:

1. **./Themes** is the root source of Theme files, where we have the following files
    * **ApplicationStyles.js**: main source for component styling. To be injected as the top level style to be applied to the component, here we instantiate the final styling for the component which cannot be abstracted to a theme definition (i.e. margins, paddings, alignments, size, etc).
    It's just a JS object, each of the elements gets merged and created into a style component by Native Base's connectStyle function. More on that later
    * **Colors.js**: Reference source for the application's theme color elements
    * **Fonts.js**: Reference for the applications's theme font and size
    * **Images.js**: Reference for the application's required images
    * **Metrics.js**: Standard measures like general margins, screen size, icon size, image size, etc.
2. **./Themes/pandavist** is the home of Native Base components' ejected styling and theming
    * **./Themes/pandavist/components**: home to the Native Base full component styling list. Each file here is used by index.js to create the final exported theme
    * **./Themes/pandavist/variables**: Source for theme specific variables used to build the definitive theme by __../components/index.js__. Variables relate to colors, default theme sizes, etc. for *pandavist* we use **./Themes/pandavist/variables/platform.js** as a source of variables
3.  Native Base applies the theme to the app by using a wrapper component, StyleProvider. Implementation is as follows:
    ```
    import getTheme from '../Themes/pandavist/components'
    import platform from '../Themes/pandavist/variables/platform'
    import { StyleProvider } from 'native-base'
    ...
    
    class App extends Component {
      render () {
        return (
          <StyleProvider style={getTheme(platform)}> 
          //StyleProvider cascades styles to it's descendants
            <Provider store={store}>
              <RootContainer />
            </Provider>
          </StyleProvider>
        )
      }
    }
    
    export default App
    ```
    We can take Native Base themes a bit further and theme our custom components. For instance, if we define a namespace for the custom components, and create a theming definition much like a Native Base component, it can be included in the *./Themes/pandavist/components* folder and exported by *index.js* and connected to the component as shown below: **TODO custom component namespace definition styling is not working still**
    ```
    ...
    import React, { PropTypes } from 'react'
    import { Item, Form, Input, Label, connectStyle } from 'native-base'
    import ApplicationStyles from '../Themes/ApplicationStyles'
    ...
    render () {
        const { username, password } = this.state
        const { fetching } = this.props
        const editable = !fetching
        const styles = this.props.style
    return (
        // custom components
        )
      }
    }
    export default connectStyle('Pandavist.EmailLogin', ApplicationStyles)(EmailLogin)
    //connectStyle merges 'Pandavist.EmailLogin' with ApplicationStyles for the final component styling
    ```
    * **Important**: Themes are passed to the component via props, so we need to replace any instance of styles with props (`const styles = this.props.style` does the trick)
