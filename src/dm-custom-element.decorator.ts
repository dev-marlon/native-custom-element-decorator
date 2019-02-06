interface DmCustomElementConfig {
    selector: string;
    template: string;
    style?: string;
}

// tslint:disable-next-line:no-empty
const noop = () => {};

// tslint:disable-next-line:variable-name
export const DmCustomElement = (config: DmCustomElementConfig) => (
    target: any
) => {
    const template = document.createElement('template');

    if (config.style) {
        config.template = `<style>${config.style}</style> ${config.template}`;
    }

    template.innerHTML = config.template;

    const connectedCallback = target.prototype.connectedCallback || noop;

    target.prototype.connectedCallback = function() {
        const clone = document.importNode(template.content, true);

        this.attachShadow({ mode: 'open' }).appendChild(clone);

        connectedCallback.call(this);
    };

    window.customElements.define(config.selector, target);
};
