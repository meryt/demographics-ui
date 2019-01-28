/<!DOCTYPE/d
/<html/d
/<head/d
/<title>/d
/<\/head>/d
/<body>/d
/<\/body/d
/<\/html>/d
s/stroke-width/strokeWidth/g
s/stroke-linecap/strokeLinecap/g
s/stroke-linejoin/strokeLinejoin/g
s/fill-rule/fillRule/g
s/<polygon id="\(polygon-[0-9]\+\)"/<polygon onClick={ this.props.clickBuilding } className={ this.props.classForPolygon('\1') } id="\1"/g

