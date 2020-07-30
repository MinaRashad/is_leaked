//putting constants
const fs = require('fs')
const os = require('os')
const prompt = require('prompt-sync')({sigint:true})
//vars
var targetIsCorrect
var target
var availableDB = {}
//Welcome!
console.log('###################################')
console.log('#isLeaked? tool made by MinaRashad#')
console.log('###################################\n')
//Legal warning
console.log("*USING THIS TOOLS FOR EDUCATION PURPOSES ONLY*")
console.log("The developer and the tool are irresponsable\n for user illigale activities\n\n")
//Starting to get info about the use target
getTarget()
//Ok we now have a string containing the supposed target email target
//lets show the user available databases
//After Showing Databases to user, they should determine which one to use

getAvailableDB()
//Functions Used
function getTarget(){
    while(!targetIsCorrect)
    {
    target = prompt('Write your target:. ')
    var targetIsCorrect = prompt(`is this right "${target}" (y/n):`).toLowerCase()[0]=='y'?true:false
    }
}


function getAvailableDB(){
    console.log('Reading available Databases...')
    //laying down available DBs
    fs.readdir('DB',(err,databaseNames)=>{
        console.log("\n#########Databases Available in (./DB)###############")
        if(err)console.log(err)
        for(var i=0; i < databaseNames.length;i++)
        {
            availableDB[i] = databaseNames[i]
            console.log(`${i})  ${databaseNames[i]}`)
        }
        choosenDB()

    })
}
function choosenDB(){
    var DB
    while(!DB){
        var DBnum = prompt('write the number of the database you which to search in:')
        DB = availableDB[DBnum]
        if(!DB){
            console.log('Err: Wrong Option Try again')
        }
    }
    console.log(`Searching in ${DB}. Please wait...`)
    searchIn(DB)
}
function searchIn(DB){
    DBStr = fs.readFileSync(`./DB/${DB}`).toString()
    DBArr = DBStr.split('\n')
    console.log('[*] Finished Reading ' +DB)

    var targetFound = false
    var targetEntry = ''
    for(let i=0;i < DBArr.length;i++){
        if(i%Math.round(DBArr.length*0.001)==0){

            console.log(`[*] Scanned ${Math.round((i/DBArr.length)*100)}% of ${DB}`)

        }
        let entry = DBArr[i].split(':')
        //if there were many things
        for(let j=0; j < entry.length; j++)
        if(entry[j] == target)
        {
            console.log('[+] Target was found')
            console.log(DBArr[i])
            targetEntry = DBArr[i]
            targetFound = true
            break;

        }
    }
    theExit(targetFound,targetEntry)
}
function theExit(isTargetFound,entry)
{

    if(isTargetFound)
    {
        console.log('\n\n##########\nTarget was found in the Database')
        console.log(entry)
    }
    else{
        console.log('\n\n##########\nTarget was not found in the database')
        console.log('You can either try another target ,change the database or add new one in the DB folder')

    }
    console.log('Exiting...')

}