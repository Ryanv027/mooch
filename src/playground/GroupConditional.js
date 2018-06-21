{this.state.groups.length ? (
    <div>
        <AddGroupBox />
        {this.state.groups.map(group => {
        return (
            <GroupBox key = {group._id} />
        )
        })}
    </div>
    ) :
<div>
    <AddGroupBox />
</div>
}