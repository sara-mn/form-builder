import {o as oi}from'./chunk-DuzQu8tj.js';import {a7 as dI,a8 as Rl,aa as re,a4 as WL,v,av as Bm,aX as hI,ao as Op,n as GD,aq as Ee,ar as EI,aA as Vp,O as ND,au as Q,aw as le}from'./main-2JAT4R4Y.js';var k=`
    .p-password {
        display: inline-flex;
        position: relative;
    }

    .p-password .p-password-overlay {
        min-width: 100%;
    }

    .p-password-meter {
        height: dt('password.meter.height');
        background: dt('password.meter.background');
        border-radius: dt('password.meter.border.radius');
    }

    .p-password-meter-label {
        height: 100%;
        width: 0;
        transition: width 1s ease-in-out;
        border-radius: dt('password.meter.border.radius');
    }

    .p-password-meter-weak {
        background: dt('password.strength.weak.background');
    }

    .p-password-meter-medium {
        background: dt('password.strength.medium.background');
    }

    .p-password-meter-strong {
        background: dt('password.strength.strong.background');
    }

    .p-password-meter-text {
        font-weight: dt('password.meter.text.font.weight');
        font-size: dt('password.meter.text.font.size');
    }

    .p-password-fluid {
        display: flex;
    }

    .p-password-fluid .p-password-input {
        width: 100%;
    }

    .p-password-input::-ms-reveal,
    .p-password-input::-ms-clear {
        display: none;
    }

    .p-password-overlay {
        padding: dt('password.overlay.padding');
        background: dt('password.overlay.background');
        color: dt('password.overlay.color');
        border: 1px solid dt('password.overlay.border.color');
        box-shadow: dt('password.overlay.shadow');
        border-radius: dt('password.overlay.border.radius');
    }

    .p-password-content {
        display: flex;
        flex-direction: column;
        gap: dt('password.content.gap');
    }

    .p-password-toggle-mask-icon {
        inset-inline-end: dt('form.field.padding.x');
        color: dt('password.icon.color');
        position: absolute;
        top: 50%;
        margin-top: calc(-1 * calc(dt('icon.size') / 2));
        width: dt('icon.size');
        height: dt('icon.size');
    }

    .p-password-clear-icon {
        position: absolute;
        top: 50%;
        margin-top: calc(-1 * dt('icon.size') / 2);
        cursor: pointer;
        inset-inline-end: dt('form.field.padding.x');
        color: dt('form.field.icon.color');
    }

    .p-password:has(.p-password-toggle-mask-icon) .p-password-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-password:has(.p-password-toggle-mask-icon) .p-password-clear-icon {
        inset-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-password:has(.p-password-clear-icon) .p-password-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-password:has(.p-password-clear-icon):has(.p-password-toggle-mask-icon)  .p-password-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 3) + calc(dt('icon.size') * 2));
    }

`;var b={root:"p-password p-component"},x=(()=>{class n extends Q{name="password";style=k;classes=b;static \u0275fac=(()=>{let e;return function(t){return (e||(e=Bm(n)))(t||n)}})();static \u0275prov=le({token:n,factory:n.\u0275fac})}return n})();var S=(()=>{class n extends re{componentName="InputPassword";mask=WL(true);_componentStyle=v(x);toggleMask(){this.mask.set(!this.mask());}get inputType(){return this.mask()?"password":"text"}static \u0275fac=(()=>{let e;return function(t){return (e||(e=Bm(n)))(t||n)}})();static \u0275dir=hI({type:n,selectors:[["","pInputPassword",""]],hostVars:3,hostBindings:function(o,t){o&2&&(Vp("type",t.inputType),ND(t.cx("root")));},inputs:{mask:[1,"mask"]},outputs:{mask:"maskChange"},features:[GD([x,{provide:Ee,useExisting:n}]),EI([{directive:oi,inputs:["invalid","invalid","variant","variant","fluid","fluid","pSize","pSize","pInputTextPT","pInputTextPT","pInputTextUnstyled","pInputTextUnstyled","hostName","hostName"]}]),Op]})}return n})(),C=(()=>{class n{static \u0275fac=function(o){return new(o||n)};static \u0275mod=dI({type:n});static \u0275inj=Rl({})}return n})();export{C,S};