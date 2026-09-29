import {k as kl}from'./chunk-Bx6ADu_A.js';import {C as Ct,f}from'./chunk-DuzQu8tj.js';import {a7 as dI,a8 as Rl,v,ac as R$1,ab as b,U as UL,ad as JL,c as cw,$ as $L,bb as yi,bc as We,M as Mu,aX as hI,ao as Op,n as GD,aq as Ee,ar as EI,z as zp,O as ND,au as Q$1,av as Bm,aw as le}from'./main-2JAT4R4Y.js';var R=`
    .p-textarea {
        font-weight: dt('textarea.font.weight');
        font-size: dt('textarea.font.size');
        color: dt('textarea.color');
        background: dt('textarea.background');
        padding-block: dt('textarea.padding.y');
        padding-inline: dt('textarea.padding.x');
        border: 1px solid dt('textarea.border.color');
        transition:
            background dt('textarea.transition.duration'),
            color dt('textarea.transition.duration'),
            border-color dt('textarea.transition.duration'),
            outline-color dt('textarea.transition.duration'),
            box-shadow dt('textarea.transition.duration');
        appearance: none;
        border-radius: dt('textarea.border.radius');
        outline-color: transparent;
        box-shadow: dt('textarea.shadow');
    }

    .p-textarea:enabled:hover {
        border-color: dt('textarea.hover.border.color');
    }

    .p-textarea:enabled:focus {
        border-color: dt('textarea.focus.border.color');
        box-shadow: dt('textarea.focus.ring.shadow');
        outline: dt('textarea.focus.ring.width') dt('textarea.focus.ring.style') dt('textarea.focus.ring.color');
        outline-offset: dt('textarea.focus.ring.offset');
    }

    .p-textarea.p-invalid {
        border-color: dt('textarea.invalid.border.color');
    }

    .p-textarea.p-variant-filled {
        background: dt('textarea.filled.background');
    }

    .p-textarea.p-variant-filled:enabled:hover {
        background: dt('textarea.filled.hover.background');
    }

    .p-textarea.p-variant-filled:enabled:focus {
        background: dt('textarea.filled.focus.background');
    }

    .p-textarea:disabled {
        opacity: 1;
        background: dt('textarea.disabled.background');
        color: dt('textarea.disabled.color');
    }

    .p-textarea::placeholder {
        color: dt('textarea.placeholder.color');
    }

    .p-textarea.p-invalid::placeholder {
        color: dt('textarea.invalid.placeholder.color');
    }

    .p-textarea-fluid {
        width: 100%;
    }

    .p-textarea-resizable {
        overflow: hidden;
        resize: none;
    }

    .p-textarea-sm {
        font-size: dt('textarea.sm.font.size');
        padding-block: dt('textarea.sm.padding.y');
        padding-inline: dt('textarea.sm.padding.x');
    }

    .p-textarea-lg {
        font-size: dt('textarea.lg.font.size');
        padding-block: dt('textarea.lg.padding.y');
        padding-inline: dt('textarea.lg.padding.x');
    }
`;var C={root:({instance:e})=>["p-textarea p-component",{"p-filled":e.$filled(),"p-textarea-resizable ":e.autoResize(),"p-variant-filled":e.$variant()==="filled","p-textarea-fluid":e.hasFluid,"p-inputfield-sm p-textarea-sm":e.pSize()==="small","p-textarea-lg p-inputfield-lg":e.pSize()==="large","p-invalid":e.invalid()}]},I=(()=>{class e extends Q$1{name="textarea";style=R;classes=C;static \u0275fac=(()=>{let t;return function(r){return (t||(t=Bm(e)))(r||e)}})();static \u0275prov=le({token:e,factory:e.\u0275fac})}return e})();var S=new b("TEXTAREA_INSTANCE"),Q=(()=>{class e extends Ct{componentName="Textarea";bindDirectiveInstance=v(R$1,{self:true});$pcTextarea=v(S,{optional:true,skipSelf:true})??void 0;pTextareaPT=UL();pTextareaUnstyled=UL();autoResize=UL(false,{transform:JL});pSize=UL();variant=UL();fluid=UL(false,{transform:JL});invalid=UL(false,{transform:JL});$variant=cw(()=>this.variant()||this.config.inputVariant());onResize=$L();get hasFluid(){return this.fluid()??!!this.pcFluid}_componentStyle=v(I);ngControl=v(f,{optional:true,self:true});pcFluid=v(yi,{optional:true,host:true,skipSelf:true});destroyRef=v(We);constructor(){super(),Mu(()=>{let t=this.pTextareaPT();t&&this.directivePT.set(t);}),Mu(()=>{this.pTextareaUnstyled()&&this.directiveUnstyled.set(this.pTextareaUnstyled());});}onInit(){this.ngControl&&this.ngControl.valueChanges&&this.ngControl.valueChanges.pipe(kl(this.destroyRef)).subscribe(()=>{this.updateState();});}onAfterViewInit(){this.autoResize()&&this.resize(),this.cd.detectChanges();}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"])),this.autoResize()&&this.resize(),this.writeModelValue(this.ngControl?.value??this.el.nativeElement.value);}onInput(t){this.writeModelValue(t.target?.value),this.updateState();}resize(t){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(t||{});}updateState(){this.autoResize()&&this.resize();}static \u0275fac=function(n){return new(n||e)};static \u0275dir=hI({type:e,selectors:[["","pTextarea",""],["","pInputTextarea",""]],hostVars:2,hostBindings:function(n,r){n&1&&zp("input",function(F){return r.onInput(F)}),n&2&&ND(r.cx("root"));},inputs:{pTextareaPT:[1,"pTextareaPT"],pTextareaUnstyled:[1,"pTextareaUnstyled"],autoResize:[1,"autoResize"],pSize:[1,"pSize"],variant:[1,"variant"],fluid:[1,"fluid"],invalid:[1,"invalid"]},outputs:{onResize:"onResize"},features:[GD([I,{provide:S,useExisting:e},{provide:Ee,useExisting:e}]),EI([R$1]),Op]})}return e})(),W=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=dI({type:e});static \u0275inj=Rl({})}return e})();export{Q,W};