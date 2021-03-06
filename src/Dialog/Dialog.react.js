/* eslint-disable import/no-unresolved, import/extensions */
import { View } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import RippleFeedback from '../RippleFeedback';
import { ViewPropTypes } from '../utils';

import Title from './Title.react';
import Content from './Content.react';
import Actions from './Actions.react';

const propTypes = {
    onPress: PropTypes.func,
    children: PropTypes.node.isRequired,
    style: PropTypes.shape({
        container: ViewPropTypes.style,
    }),
};
const defaultProps = {
    onPress: null,
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context) {
    const { dialog } = context.uiTheme;

    return {
        container: [
            dialog.container,
            props.style.container,
        ],
    };
}

class Dialog extends PureComponent {
    renderContent = () => {
        const { children } = this.props;
        const styles = getStyles(this.props, this.context);

        return (
            <View style={styles.container} pointerEvents="auto">
                {children}
            </View>
        );
    }
    render() {
        const { onPress } = this.props;

        if (onPress) {
            return (
                <RippleFeedback onPress={onPress}>
                    {this.renderContent()}
                </RippleFeedback>
            );
        }

        return this.renderContent();
    }
}

Dialog.propTypes = propTypes;
Dialog.defaultProps = defaultProps;
Dialog.contextTypes = contextTypes;

Dialog.Title = Title;
Dialog.Content = Content;
Dialog.Actions = Actions;

export default Dialog;
