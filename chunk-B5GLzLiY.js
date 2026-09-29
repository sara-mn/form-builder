import {q as qt,U as Ut}from'./chunk-C80Zmkxl.js';import {a7 as dI,a8 as Rl,a9 as un,aC as lp,aa as re,v,ab as b,ac as R,U as UL,ad as JL,a4 as WL,$ as $L,af as qL,bk as GL,ah as wo,c as cw,r,av as Bm,l as lI,am as Pn,cp as G,bS as G$1,ao as Op,ap as sD,E as Ei,V as VI,L as Lp,x as xc,z as zp,ay as aD,w as bD,O as ND,H as Hp,aA as Vp,S as Sv,B as BI,n as GD,aq as Ee$1,ar as EI,bq as Kp,at as dD,as as Yp,au as Q,aw as le,K as KI,A as nu,C as oD,D as ru,ba as fD,F as FD,f as dh,az as Wp,J as mu,N as Bp,Z as ow}from'./main-2JAT4R4Y.js';var pe=`
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
`;var fe=["header"],ue=["toggleicon"],me=["expandicon"],_e=["collapseicon"],be=["content"],Ce=["contentWrapper"],ve=["*",[["p-header"]]],Te=["*","p-header"];function he(e,i){e&1&&Wp(0);}function xe(e,i){if(e&1&&(Ei(0,"span",2),Lp(1,he,1,0,"ng-container",8),xc()),e&2){let t=oD(2);ND(t.cx("toggleIcon")),Hp("pBind",t.ptm("toggleIcon")),Sv(),Hp("ngTemplateOutlet",t.toggleIconTemplate())("ngTemplateOutletContext",t.toggleIconContext());}}function ye(e,i){if(e&1&&(mu(),Bp(0,"svg",10)),e&2){let t=oD(3);ND(t.cx("toggleIcon")),Hp("pBind",t.ptm("toggleIcon"));}}function Me(e,i){e&1&&Wp(0);}function Ie(e,i){if(e&1&&(Ei(0,"span",2),Lp(1,Me,1,0,"ng-container",5),xc()),e&2){let t=oD(3);ND(t.cx("toggleIcon")),Hp("pBind",t.ptm("toggleIcon")),Sv(),Hp("ngTemplateOutlet",t.expandIconTemplate());}}function De(e,i){if(e&1&&VI(0,ye,1,3,":svg:svg",9)(1,Ie,2,4,"span",7),e&2){let t=oD(2);BI(t.expandIconTemplate()?1:0);}}function Be(e,i){if(e&1&&(mu(),Bp(0,"svg",12)),e&2){let t=oD(3);ND(t.cx("toggleIcon")),Hp("pBind",t.ptm("toggleIcon")),Vp("aria-hidden",true);}}function we(e,i){e&1&&Wp(0);}function Fe(e,i){if(e&1&&(Ei(0,"span",2),Lp(1,we,1,0,"ng-container",5),xc()),e&2){let t=oD(3);ND(t.cx("toggleIcon")),Hp("pBind",t.ptm("toggleIcon")),Sv(),Hp("ngTemplateOutlet",t.collapseIconTemplate());}}function Ee(e,i){if(e&1&&VI(0,Be,1,4,":svg:svg",11)(1,Fe,2,4,"span",7),e&2){let t=oD(2);BI(t.collapseIconTemplate()?1:0);}}function Ne(e,i){e&1&&Wp(0);}function Oe(e,i){if(e&1){let t=KI();Ei(0,"button",6),zp("click",function(n){nu(t);let s=oD();return ru(s.toggle(n))})("keydown",function(n){nu(t);let s=oD();return ru(s.onKeyDown(n))}),VI(1,xe,2,5,"span",7)(2,De,2,1)(3,Ee,2,1),Lp(4,Ne,1,0,"ng-container",5),xc();}if(e&2){let t=oD(),l=fD(5);ND(t.cx("toggleButton")),Hp("pBind",t.ptm("toggleButton")),Vp("id",t.headerId)("aria-controls",t.contentId)("aria-expanded",!t.collapsed())("aria-label",t.buttonAriaLabel()),Sv(),BI(t.toggleIconTemplate()?1:t.collapsed()?2:3),Sv(3),Hp("ngTemplateOutlet",l);}}function Ae(e,i){e&1&&Wp(0);}function Se(e,i){if(e&1&&Lp(0,Ae,1,0,"ng-container",5),e&2){oD();let t=fD(5);Hp("ngTemplateOutlet",t);}}function ke(e,i){e&1&&Wp(0);}function Ve(e,i){if(e&1&&(Ei(0,"span",2),FD(1),xc(),aD(2,1),Lp(3,ke,1,0,"ng-container",5)),e&2){let t=oD();ND(t.cx("legendLabel")),Hp("pBind",t.ptm("legendLabel")),Sv(),dh(t.legend()),Sv(2),Hp("ngTemplateOutlet",t.headerTemplate());}}function Le(e,i){e&1&&Wp(0);}var We={root:({instance:e})=>{let i=e.toggleable();e.collapsed();return ["p-fieldset p-component",{"p-fieldset-toggleable":i}]},legend:"p-fieldset-legend",legendLabel:"p-fieldset-legend-label",toggleButton:"p-fieldset-toggle-button",toggleIcon:"p-fieldset-toggle-icon",contentContainer:"p-fieldset-content-container",contentWrapper:"p-fieldset-content-wrapper",content:"p-fieldset-content"},ce=(()=>{class e extends Q{name="fieldset";style=pe;classes=We;static \u0275fac=(()=>{let t;return function(n){return (t||(t=Bm(e)))(n||e)}})();static \u0275prov=le({token:e,factory:e.\u0275fac})}return e})();var ge=new b("FIELDSET_INSTANCE"),je=(()=>{class e extends re{componentName="Fieldset";$pcFieldset=v(ge,{optional:true,skipSelf:true})??void 0;_componentStyle=v(ce);bindDirectiveInstance=v(R,{self:true});legend=UL();toggleable=UL(false,{transform:JL});collapsed=WL(false);style=UL();styleClass=UL();motionOptions=UL();onBeforeToggle=$L();onAfterToggle=$L();headerTemplate=qL("header",{descendants:false});toggleIconTemplate=qL("toggleicon",{descendants:false});expandIconTemplate=qL("expandicon",{descendants:false});collapseIconTemplate=qL("collapseicon",{descendants:false});contentTemplate=qL("content",{descendants:false});contentWrapperViewChild=GL("contentWrapper");_id=wo("pn_id_");get id(){return this._id}get headerId(){return this.id+"_header"}get contentId(){return this.id+"_content"}buttonAriaLabel=cw(()=>this.legend());toggleIconContext=cw(()=>({$implicit:this.collapsed(),collapsed:this.collapsed()}));dataP=cw(()=>this.cn({toggleable:this.toggleable()}));contentTabindex=cw(()=>this.collapsed()?"-1":void 0);isContentVisible=cw(()=>!this.toggleable()||this.toggleable()&&!this.collapsed());computedMotionOptions=cw(()=>r(r({},this.ptm("motion")),this.motionOptions()));onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"));}toggle(t){this.onBeforeToggle.emit({originalEvent:t,collapsed:this.collapsed()}),this.collapsed()?this.expand():this.collapse(),t.preventDefault();}onKeyDown(t){(t.code==="Enter"||t.code==="Space")&&(this.toggle(t),t.preventDefault());}expand(){this.collapsed.set(false),this.updateTabIndex();}collapse(){this.collapsed.set(true),this.updateTabIndex();}getBlockableElement(){return this.el.nativeElement.children[0]}updateTabIndex(){let t=this.contentWrapperViewChild();t&&t.nativeElement.querySelectorAll("input, button, select, a, textarea, [tabindex]").forEach(n=>{this.collapsed()?n.setAttribute("tabindex","-1"):n.removeAttribute("tabindex");});}onToggleDone(t){this.onAfterToggle.emit({originalEvent:t,collapsed:this.collapsed()});}static \u0275fac=(()=>{let t;return function(n){return (t||(t=Bm(e)))(n||e)}})();static \u0275cmp=lI({type:e,selectors:[["p-fieldset"]],contentQueries:function(l,n,s){l&1&&Yp(s,n.headerTemplate,fe,4)(s,n.toggleIconTemplate,ue,4)(s,n.expandIconTemplate,me,4)(s,n.collapseIconTemplate,_e,4)(s,n.contentTemplate,be,4),l&2&&dD(5);},viewQuery:function(l,n){l&1&&Kp(n.contentWrapperViewChild,Ce,5),l&2&&dD();},inputs:{legend:[1,"legend"],toggleable:[1,"toggleable"],collapsed:[1,"collapsed"],style:[1,"style"],styleClass:[1,"styleClass"],motionOptions:[1,"motionOptions"]},outputs:{collapsed:"collapsedChange",onBeforeToggle:"onBeforeToggle",onAfterToggle:"onAfterToggle"},features:[GD([ce,{provide:ge,useExisting:e},{provide:Ee$1,useExisting:e}]),EI([R]),Op],ngContentSelectors:Te,decls:12,vars:28,consts:[["legendContent",""],["contentWrapper",""],[3,"pBind"],["tabindex","0","role","button",3,"class","pBind"],["pMotionName","p-collapsible","role","region",3,"pMotionOnAfterEnter","pMotionOnAfterLeave","pBind","pMotion","pMotionOptions","id"],[4,"ngTemplateOutlet"],["tabindex","0","role","button",3,"click","keydown","pBind"],[3,"class","pBind"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["data-p-icon","plus",3,"class","pBind"],["data-p-icon","plus",3,"pBind"],["data-p-icon","minus",3,"class","pBind"],["data-p-icon","minus",3,"pBind"]],template:function(l,n){l&1&&(sD(ve),Ei(0,"fieldset",2)(1,"legend",2),VI(2,Oe,5,9,"button",3)(3,Se,1,1,"ng-container"),Lp(4,Ve,4,5,"ng-template",null,0,ow),xc(),Ei(6,"div",4),zp("pMotionOnAfterEnter",function(M){return n.onToggleDone(M)})("pMotionOnAfterLeave",function(M){return n.onToggleDone(M)}),Ei(7,"div",2)(8,"div",2,1),aD(10),Lp(11,Le,1,0,"ng-container",5),xc()()()()),l&2&&(bD(n.style()),ND(n.cn(n.cx("root"),n.styleClass())),Hp("pBind",n.ptm("root")),Vp("id",n.id)("data-p",n.dataP()),Sv(),ND(n.cx("legend")),Hp("pBind",n.ptm("legend")),Vp("data-p",n.dataP()),Sv(),BI(n.toggleable()?2:3),Sv(4),ND(n.cx("contentContainer")),Hp("pBind",n.ptm("contentContainer"))("pMotion",n.isContentVisible())("pMotionOptions",n.computedMotionOptions())("id",n.contentId),Vp("aria-labelledby",n.headerId)("aria-hidden",n.collapsed())("tabindex",n.contentTabindex()),Sv(),ND(n.cx("contentWrapper")),Hp("pBind",n.ptm("contentWrapper")),Sv(),ND(n.cx("content")),Hp("pBind",n.ptm("content")),Sv(3),Hp("ngTemplateOutlet",n.contentTemplate()));},dependencies:[Pn,G,G$1,un,lp,R,qt,Ut],encapsulation:2})}return e})(),at=(()=>{class e{static \u0275fac=function(l){return new(l||e)};static \u0275mod=dI({type:e});static \u0275inj=Rl({imports:[je,un,lp,un,lp]})}return e})();export{at as a};