import {q as qt,U as Ut$1}from'./chunk-DtoyA4d8.js';import {a4 as kE,a5 as El,a6 as Ut,aq as Ad,a7 as J,v,aw as C,af as N,e as eL,a8 as lL,aa as tL,X as XO,ac as rL,ab as nL,bq as Ai,f as bD,r,aU as hm,A as AE,ap as bn,c8 as G,aT as ni,au as cp,b5 as TI,g as ai,c as aI,w as up,y as yc,T as Tp,b6 as wI,D as BI,O as UI,j as gp,av as hp,K as Ky,d as cI,z as aD,ax as pe$1,ay as BE,az as Mp,aA as _I,aB as bp,aX as G$1,aW as oe,F as vI,U as Ul,I as II,J as ql,be as NI,i as XI,H as Hp,bd as Ep,L as ru,M as mp,Y as DD}from'./main-P5PZOTZR.js';var pe=`
    .p-fieldset {
        background: dt('fieldset.background');
        border: 1px solid dt('fieldset.border.color');
        border-radius: dt('fieldset.border.radius');
        color: dt('fieldset.color');
        padding: dt('fieldset.padding');
        margin: 0;
    }

    .p-fieldset-legend {
        background: dt('fieldset.legend.background');
        border-radius: dt('fieldset.legend.border.radius');
        border-width: dt('fieldset.legend.border.width');
        border-style: solid;
        border-color: dt('fieldset.legend.border.color');
        color: dt('fieldset.legend.color');
        padding: dt('fieldset.legend.padding');
        transition:
            background dt('fieldset.transition.duration'),
            color dt('fieldset.transition.duration'),
            outline-color dt('fieldset.transition.duration'),
            box-shadow dt('fieldset.transition.duration');
    }

    .p-fieldset-toggleable > .p-fieldset-legend {
        padding: 0;
    }

    .p-fieldset-toggle-button {
        cursor: pointer;
        user-select: none;
        overflow: hidden;
        position: relative;
        text-decoration: none;
        display: flex;
        gap: dt('fieldset.legend.gap');
        align-items: center;
        justify-content: center;
        padding: dt('fieldset.legend.padding');
        background: transparent;
        border: 0 none;
        border-radius: dt('fieldset.legend.border.radius');
        transition:
            background dt('fieldset.transition.duration'),
            color dt('fieldset.transition.duration'),
            outline-color dt('fieldset.transition.duration'),
            box-shadow dt('fieldset.transition.duration');
        outline-color: transparent;
    }

    .p-fieldset-legend-label {
        font-weight: dt('fieldset.legend.font.weight');
        font-size: dt('fieldset.legend.font.size');
    }

    .p-fieldset-toggle-button:focus-visible {
        box-shadow: dt('fieldset.legend.focus.ring.shadow');
        outline: dt('fieldset.legend.focus.ring.width') dt('fieldset.legend.focus.ring.style') dt('fieldset.legend.focus.ring.color');
        outline-offset: dt('fieldset.legend.focus.ring.offset');
    }

    .p-fieldset-toggleable > .p-fieldset-legend:hover {
        color: dt('fieldset.legend.hover.color');
        background: dt('fieldset.legend.hover.background');
    }

    .p-fieldset-toggle-icon {
        color: dt('fieldset.toggle.icon.color');
        transition: color dt('fieldset.transition.duration');
    }

    .p-fieldset-toggleable > .p-fieldset-legend:hover .p-fieldset-toggle-icon {
        color: dt('fieldset.toggle.icon.hover.color');
    }

    .p-fieldset-content-container {
        display: grid;
        grid-template-rows: 1fr;
    }

    .p-fieldset-content-wrapper {
        min-height: 0;
    }

    .p-fieldset-content {
        padding: dt('fieldset.content.padding');
    }

    .p-fieldset-trigger {
        cursor: pointer;
    }
`;var fe=["header"],ue=["toggleicon"],me=["expandicon"],_e=["collapseicon"],be=["content"],Ce=["contentWrapper"],ve=["*",[["p-header"]]],Te=["*","p-header"];function he(e,i){e&1&&Ep(0);}function xe(e,i){if(e&1&&(ai(0,"span",2),up(1,he,1,0,"ng-container",8),yc()),e&2){let t=II(2);UI(t.cx("toggleIcon")),gp("pBind",t.ptm("toggleIcon")),Ky(),gp("ngTemplateOutlet",t.toggleIconTemplate())("ngTemplateOutletContext",t.toggleIconContext());}}function ye(e,i){if(e&1&&(ru(),mp(0,"svg",10)),e&2){let t=II(3);UI(t.cx("toggleIcon")),gp("pBind",t.ptm("toggleIcon"));}}function Me(e,i){e&1&&Ep(0);}function Ie(e,i){if(e&1&&(ai(0,"span",2),up(1,Me,1,0,"ng-container",5),yc()),e&2){let t=II(3);UI(t.cx("toggleIcon")),gp("pBind",t.ptm("toggleIcon")),Ky(),gp("ngTemplateOutlet",t.expandIconTemplate());}}function De(e,i){if(e&1&&aI(0,ye,1,3,":svg:svg",9)(1,Ie,2,4,"span",7),e&2){let t=II(2);cI(t.expandIconTemplate()?1:0);}}function Be(e,i){if(e&1&&(ru(),mp(0,"svg",12)),e&2){let t=II(3);UI(t.cx("toggleIcon")),gp("pBind",t.ptm("toggleIcon")),hp("aria-hidden",true);}}function we(e,i){e&1&&Ep(0);}function Fe(e,i){if(e&1&&(ai(0,"span",2),up(1,we,1,0,"ng-container",5),yc()),e&2){let t=II(3);UI(t.cx("toggleIcon")),gp("pBind",t.ptm("toggleIcon")),Ky(),gp("ngTemplateOutlet",t.collapseIconTemplate());}}function Ee(e,i){if(e&1&&aI(0,Be,1,4,":svg:svg",11)(1,Fe,2,4,"span",7),e&2){let t=II(2);cI(t.collapseIconTemplate()?1:0);}}function Ne(e,i){e&1&&Ep(0);}function Oe(e,i){if(e&1){let t=vI();ai(0,"button",6),Tp("click",function(n){Ul(t);let s=II();return ql(s.toggle(n))})("keydown",function(n){Ul(t);let s=II();return ql(s.onKeyDown(n))}),aI(1,xe,2,5,"span",7)(2,De,2,1)(3,Ee,2,1),up(4,Ne,1,0,"ng-container",5),yc();}if(e&2){let t=II(),l=NI(5);UI(t.cx("toggleButton")),gp("pBind",t.ptm("toggleButton")),hp("id",t.headerId)("aria-controls",t.contentId)("aria-expanded",!t.collapsed())("aria-label",t.buttonAriaLabel()),Ky(),cI(t.toggleIconTemplate()?1:t.collapsed()?2:3),Ky(3),gp("ngTemplateOutlet",l);}}function Ae(e,i){e&1&&Ep(0);}function Se(e,i){if(e&1&&up(0,Ae,1,0,"ng-container",5),e&2){II();let t=NI(5);gp("ngTemplateOutlet",t);}}function ke(e,i){e&1&&Ep(0);}function Ve(e,i){if(e&1&&(ai(0,"span",2),XI(1),yc(),wI(2,1),up(3,ke,1,0,"ng-container",5)),e&2){let t=II();UI(t.cx("legendLabel")),gp("pBind",t.ptm("legendLabel")),Ky(),Hp(t.legend()),Ky(2),gp("ngTemplateOutlet",t.headerTemplate());}}function Le(e,i){e&1&&Ep(0);}var We={root:({instance:e})=>{let i=e.toggleable();e.collapsed();return ["p-fieldset p-component",{"p-fieldset-toggleable":i}]},legend:"p-fieldset-legend",legendLabel:"p-fieldset-legend-label",toggleButton:"p-fieldset-toggle-button",toggleIcon:"p-fieldset-toggle-icon",contentContainer:"p-fieldset-content-container",contentWrapper:"p-fieldset-content-wrapper",content:"p-fieldset-content"},ce=(()=>{class e extends G$1{name="fieldset";style=pe;classes=We;static \u0275fac=(()=>{let t;return function(n){return (t||(t=hm(e)))(n||e)}})();static \u0275prov=oe({token:e,factory:e.\u0275fac})}return e})();var ge=new C("FIELDSET_INSTANCE"),je=(()=>{class e extends J{componentName="Fieldset";$pcFieldset=v(ge,{optional:true,skipSelf:true})??void 0;_componentStyle=v(ce);bindDirectiveInstance=v(N,{self:true});legend=eL();toggleable=eL(false,{transform:lL});collapsed=tL(false);style=eL();styleClass=eL();motionOptions=eL();onBeforeToggle=XO();onAfterToggle=XO();headerTemplate=rL("header",{descendants:false});toggleIconTemplate=rL("toggleicon",{descendants:false});expandIconTemplate=rL("expandicon",{descendants:false});collapseIconTemplate=rL("collapseicon",{descendants:false});contentTemplate=rL("content",{descendants:false});contentWrapperViewChild=nL("contentWrapper");_id=Ai("pn_id_");get id(){return this._id}get headerId(){return this.id+"_header"}get contentId(){return this.id+"_content"}buttonAriaLabel=bD(()=>this.legend());toggleIconContext=bD(()=>({$implicit:this.collapsed(),collapsed:this.collapsed()}));dataP=bD(()=>this.cn({toggleable:this.toggleable()}));contentTabindex=bD(()=>this.collapsed()?"-1":void 0);isContentVisible=bD(()=>!this.toggleable()||this.toggleable()&&!this.collapsed());computedMotionOptions=bD(()=>r(r({},this.ptm("motion")),this.motionOptions()));onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"));}toggle(t){this.onBeforeToggle.emit({originalEvent:t,collapsed:this.collapsed()}),this.collapsed()?this.expand():this.collapse(),t.preventDefault();}onKeyDown(t){(t.code==="Enter"||t.code==="Space")&&(this.toggle(t),t.preventDefault());}expand(){this.collapsed.set(false),this.updateTabIndex();}collapse(){this.collapsed.set(true),this.updateTabIndex();}getBlockableElement(){return this.el.nativeElement.children[0]}updateTabIndex(){let t=this.contentWrapperViewChild();t&&t.nativeElement.querySelectorAll("input, button, select, a, textarea, [tabindex]").forEach(n=>{this.collapsed()?n.setAttribute("tabindex","-1"):n.removeAttribute("tabindex");});}onToggleDone(t){this.onAfterToggle.emit({originalEvent:t,collapsed:this.collapsed()});}static \u0275fac=(()=>{let t;return function(n){return (t||(t=hm(e)))(n||e)}})();static \u0275cmp=AE({type:e,selectors:[["p-fieldset"]],contentQueries:function(l,n,s){l&1&&bp(s,n.headerTemplate,fe,4)(s,n.toggleIconTemplate,ue,4)(s,n.expandIconTemplate,me,4)(s,n.collapseIconTemplate,_e,4)(s,n.contentTemplate,be,4),l&2&&_I(5);},viewQuery:function(l,n){l&1&&Mp(n.contentWrapperViewChild,Ce,5),l&2&&_I();},inputs:{legend:[1,"legend"],toggleable:[1,"toggleable"],collapsed:[1,"collapsed"],style:[1,"style"],styleClass:[1,"styleClass"],motionOptions:[1,"motionOptions"]},outputs:{collapsed:"collapsedChange",onBeforeToggle:"onBeforeToggle",onAfterToggle:"onAfterToggle"},features:[aD([ce,{provide:ge,useExisting:e},{provide:pe$1,useExisting:e}]),BE([N]),cp],ngContentSelectors:Te,decls:12,vars:28,consts:[["legendContent",""],["contentWrapper",""],[3,"pBind"],["tabindex","0","role","button",3,"class","pBind"],["pMotionName","p-collapsible","role","region",3,"pMotionOnAfterEnter","pMotionOnAfterLeave","pBind","pMotion","pMotionOptions","id"],[4,"ngTemplateOutlet"],["tabindex","0","role","button",3,"click","keydown","pBind"],[3,"class","pBind"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["data-p-icon","plus",3,"class","pBind"],["data-p-icon","plus",3,"pBind"],["data-p-icon","minus",3,"class","pBind"],["data-p-icon","minus",3,"pBind"]],template:function(l,n){l&1&&(TI(ve),ai(0,"fieldset",2)(1,"legend",2),aI(2,Oe,5,9,"button",3)(3,Se,1,1,"ng-container"),up(4,Ve,4,5,"ng-template",null,0,DD),yc(),ai(6,"div",4),Tp("pMotionOnAfterEnter",function(M){return n.onToggleDone(M)})("pMotionOnAfterLeave",function(M){return n.onToggleDone(M)}),ai(7,"div",2)(8,"div",2,1),wI(10),up(11,Le,1,0,"ng-container",5),yc()()()()),l&2&&(BI(n.style()),UI(n.cn(n.cx("root"),n.styleClass())),gp("pBind",n.ptm("root")),hp("id",n.id)("data-p",n.dataP()),Ky(),UI(n.cx("legend")),gp("pBind",n.ptm("legend")),hp("data-p",n.dataP()),Ky(),cI(n.toggleable()?2:3),Ky(4),UI(n.cx("contentContainer")),gp("pBind",n.ptm("contentContainer"))("pMotion",n.isContentVisible())("pMotionOptions",n.computedMotionOptions())("id",n.contentId),hp("aria-labelledby",n.headerId)("aria-hidden",n.collapsed())("tabindex",n.contentTabindex()),Ky(),UI(n.cx("contentWrapper")),gp("pBind",n.ptm("contentWrapper")),Ky(),UI(n.cx("content")),gp("pBind",n.ptm("content")),Ky(3),gp("ngTemplateOutlet",n.contentTemplate()));},dependencies:[bn,G,ni,Ut,Ad,N,qt,Ut$1],encapsulation:2})}return e})(),at=(()=>{class e{static \u0275fac=function(l){return new(l||e)};static \u0275mod=kE({type:e});static \u0275inj=El({imports:[je,Ut,Ad,Ut,Ad]})}return e})();export{at as a};