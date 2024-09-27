/// reference path="./node_modules/@types(jquery/index.d.ts"

enum WorkingMode {
    Saving,
    Editing
}

const EditStudentClassName: string = "EditStudent";
const DeleteStudentClassName: string = "DeleteStudent";
const MinNumberOfCharactersInName: number = 3;
const MinStudentAge: number = 15;
const MaxStudentAge: number = 70;

const HideClassCSSName: string = "DontShowControl";
const HideClassButtonValue: string = "Luk ned for TypeScript Function Overload Demo !!!";
const ShowClassButtonValue: string = "Luk op for TypeScript Function Overload Demo !!!";

var btnClearTextFields;
var btnAddNewStudent;
var studentTableId;
var txtStudentName;
var txtStudentAge;
var btnEditStudent;
var btnSkipEditStudent;
var StudentDataRows;
var TypeScriptDemo;
var NumberOfObjectsOnClass;
var btnTypeScriptFunctionOverloadDemo;
var TestFunctionOverload;
var txtStudentAdd1;
var txtStudentAdd2;

//var btnAddNewStudent: JQuery<HTMLElement>;
//var studentTableId: JQuery<HTMLElement>;
//var txtStudentName: JQuery<HTMLElement>;
//var txtStudentAge: JQuery<HTMLElement>;
//var StudentDataRows: JQuery<HTMLElement>;
//var TypeScriptDemo: JQuery<HTMLElement>;


//var StudentList = [];
var StudentList: Student[] = [];

var StudentNameSave: string;
var StudentAgeSave: number;
var StudentIdSave: number;
var ThisSave;

class Student {
    private _studentId: number;
    private _studentName: string;
    private _studentAge: number;

    private static _numberOfObjectCreatedOnClass: number = 0;
    private static _nextStudentIdNumber: number = 0;

    get StudentID(): number {
        return this._studentId;
    }

    set StudentAge(StudentAge: number) {
        this._studentAge = StudentAge;
    }

    get StudentAge(): number {
        return (this._studentAge);
    }

    set StudentName(StudentName: string) {
        this._studentName = StudentName;
    }

    get StudentName(): string {
        return (this._studentName);
    }

    static set NumberOfObjectCreatedOnClass(NumberOfObjects: number) {
        Student._numberOfObjectCreatedOnClass = NumberOfObjects;
    }

    static get NumberOfObjectCreatedOnClass(): number {
        return (Student._numberOfObjectCreatedOnClass);
    }

    constructor(StudentAge: number, StudentName: string) {
        this._studentAge = StudentAge;
        this._studentName = StudentName;
        Student._numberOfObjectCreatedOnClass++;
        Student._nextStudentIdNumber++;
        this._studentId = Student._nextStudentIdNumber;
    }

    public AddStudentStuff(Student1: any, Student2: any): any {
        return (Student1 + Student2);
    }

    public static AddStudentStuffStatic(Student1: any, Student2: any): any {
        return (Student1 + Student2);
    }

    public toString(): string {
        return ("Student med ID : " + this._studentId + " og navn : " + this._studentName + " er " + this._studentAge + " år gammel !!! ");
    }
}

//function AddStudentStuff(StudentAge1: number, StudentAge2: number): number; 
//function AddStudentStuff(StudentAge1: number, StudentAge2: string): string;
//function AddStudentStuff(StudentAge1: string, StudentAge2: number): string;
//function AddStudentStuff(StudentName1: string, StudentName2: string): string; 

function AddStudentStuff(Student1: any, Student2: any): any {
    return (Student1 + Student2);
}

function FindIndexInArray(StudentId: number): number {
    var IndexInArray: number = 0;

    while (IndexInArray < StudentList.length) {
        if (StudentList[IndexInArray].StudentID == StudentId) {
            return (IndexInArray);
        }
        IndexInArray++;
    }
    return (-1); 
}

function DeleteStudentObject(StudentId: number) {
    var IndexInArray: number;

    IndexInArray = FindIndexInArray(StudentId);

    if (IndexInArray >= 0) {
        StudentList.splice(IndexInArray, 1);
        Student.NumberOfObjectCreatedOnClass = --Student.NumberOfObjectCreatedOnClass;
    }
}

$(document).ready(function () {
    function SpecifyNumberOfObjectsOnClass() {
        $("#NumberOfObjectsOnClass").text("Antal objekter defineret på klasse er : " + Student.NumberOfObjectCreatedOnClass);
    }

    function SwichBetweenSaveAndEditMode(CurrentWorkingMode: WorkingMode) {
        if (WorkingMode.Saving == CurrentWorkingMode) {
            btnSkipEditStudent.addClass("DontShowControl");
            btnEditStudent.addClass("DontShowControl");
            btnAddNewStudent.removeClass("DontShowControl");
        }
        else {
            btnSkipEditStudent.removeClass("DontShowControl");
            btnEditStudent.removeClass("DontShowControl");
            btnAddNewStudent.addClass("DontShowControl");
        }
    }

    function GetStoredValuesBack() {
        txtStudentName.val(StudentNameSave);
        txtStudentAge.val(StudentAgeSave);
    }

    function ModifyStudentObject(StudentId: number): Student {
        var IndexInArray: number;

        IndexInArray = FindIndexInArray(StudentId);

        if (IndexInArray >= 0) {
            StudentList[IndexInArray].StudentName = txtStudentName.val();
            StudentList[IndexInArray].StudentAge = txtStudentAge.val();
            return (StudentList[IndexInArray]);
        }
        else {
            return (null);
        }
    }

    function ClearTextFields() {
        txtStudentName.val("");
        txtStudentAge.val("");
    }

    function CheckTextFields(): boolean {
        var StudentAgeTest: number;

        if ( $("#txtStudentName").val().length < MinNumberOfCharactersInName) {
            alert("Der skal minimum være " + MinNumberOfCharactersInName.toString() + " karakterer i Student navn !!!");
            return (false);
        }

        try {
            StudentAgeTest = parseInt($("#txtStudentAge").val());
        }

        catch (e) {
            alert(e.message);
            return (false);
        }

        if ((StudentAgeTest >= MinStudentAge) && (StudentAgeTest <= MaxStudentAge)) {
            return (true);
        }
        else {
            alert("Student alder skal ligge i intervallet " + MinStudentAge.toString() +
                " - " + MaxStudentAge.toString() + " !!!");
        }

        return (false);
    }

    $(document).on("click", ".ContentFrameForHTMLFiles #btnClearTextFields", function() {
        ClearTextFields();
    });

    $(document).on("click", ".ContentFrameForHTMLFiles #btnAddNewStudent", function() {
        btnClearTextFields = $("#btnClearTextFields");
        btnAddNewStudent = $("#btnAddNewStudent");
        studentTableId = $("#StudentData");
        txtStudentName = $("#txtStudentName");
        txtStudentAge = $("#txtStudentAge");
        btnEditStudent = $("#btnEditStudent");
        btnSkipEditStudent = $("#btnSkipEditStudent");
        StudentDataRows = $(".StudentDataRows");
        TypeScriptDemo = $("#TypeScriptDemo");
        NumberOfObjectsOnClass = $("#NumberOfObjectsOnClass");
        btnTypeScriptFunctionOverloadDemo = $("#btnTypeScriptFunctionOverloadDemo");
        TestFunctionOverload = $("#TestFunctionOverload");
        txtStudentAdd1 = $("#txtStudentAdd1");
        txtStudentAdd2 = $("#txtStudentAdd2");

        if (CheckTextFields()) {
            var WorkString: string;
            var Student_Object: Student = new Student(txtStudentAge.val(), txtStudentName.val());
            StudentList.push(Student_Object);

            WorkString = "<tr class = 'Student'>";
            WorkString += "<td class = StudentId>";
            WorkString += Student_Object.StudentID;
            WorkString += "<td class = 'StudentName'>";
            WorkString += Student_Object.StudentName;
            WorkString += "<td class = 'StudentAge'>";
            WorkString += Student_Object.StudentAge;
            WorkString += "<td class = 'StudentDescription'>"
            WorkString += Student_Object.toString();
            WorkString += "<td>"
            WorkString += "<button type='button'";
            WorkString += "value='" + Student_Object.StudentID + "' ";
            WorkString += "class='" + EditStudentClassName + "'";
            WorkString += ">Ret Student (" + Student_Object.StudentID + ") </button>";
            WorkString += "<td>";
            WorkString += "<button type='button'";
            WorkString += "value='" + Student_Object.StudentID + "' ";
            WorkString += "class='" + DeleteStudentClassName + "'";
            WorkString += ">Slet Student (" + Student_Object.StudentID + ") </button>";
            WorkString += "</tr>";
            $(".StudentDataRows").append(WorkString);

            $("#TypeScriptDemo").html(StudentList.toString());
            SpecifyNumberOfObjectsOnClass();
            ClearTextFields();
        }
    });

    $('body').on('click', '.' + DeleteStudentClassName, function () {
        var StudentId: number = Number($(this).val());
        var CurrentRow = $(this).closest('tr');
        var CurrentRowCells = CurrentRow.children();
        var StudentName = CurrentRowCells.eq(1).text();

        if (confirm("Ønsker du slette den studerende " + StudentName + " ?")) {
            DeleteStudentObject(StudentId);
            CurrentRow.remove();
            TypeScriptDemo.html(StudentList.toString());
            SpecifyNumberOfObjectsOnClass();
        }
    });

    $('body').on('click', '.' + EditStudentClassName, function () {
        var StudentId: number = Number($(this).val());
        var CurrentRow = $(this).closest('tr');
        var CurrentRowCells = CurrentRow.children();
        var StudentName: string = CurrentRowCells.eq(1).text();
        var StudentAge: number = parseInt(CurrentRowCells.eq(2).text());
        StudentNameSave = txtStudentName.val();
        StudentAgeSave = txtStudentAge.val();
        StudentIdSave = StudentId;
        ThisSave = $(this);

        txtStudentName.val(StudentName);
        txtStudentAge.val(StudentAge);

        SwichBetweenSaveAndEditMode(WorkingMode.Editing);
    });

    $(document).on("click", ".ContentFrameForHTMLFiles #btnSkipEditStudent", function() {
        GetStoredValuesBack();
        SwichBetweenSaveAndEditMode(WorkingMode.Saving);
    });

    $(document).on("click", ".ContentFrameForHTMLFiles #btnEditStudent", function() {
        var Student_Object: Student;
        var StudentId: number = Number(ThisSave.val());
        var CurrentRow = ThisSave.closest('tr');
        var CurrentRowCells = CurrentRow.children();
        CurrentRowCells.eq(1).text(txtStudentName.val());
        CurrentRowCells.eq(2).text(parseInt(txtStudentAge.val()));

        Student_Object = ModifyStudentObject(StudentId);

        if (null != Student_Object) {
            CurrentRowCells.eq(3).text(Student_Object.toString());
        }

        GetStoredValuesBack();
        SwichBetweenSaveAndEditMode(WorkingMode.Saving);
        TypeScriptDemo.html(StudentList.toString());
    });

    $(document).on("click", ".ContentFrameForHTMLFiles #btnTypeScriptFunctionOverloadDemo", function() {
        if (TestFunctionOverload.hasClass(HideClassCSSName)) {
            TestFunctionOverload.removeClass(HideClassCSSName);
            btnTypeScriptFunctionOverloadDemo.val(HideClassButtonValue);
        }
        else {
            TestFunctionOverload.addClass(HideClassCSSName);
            btnTypeScriptFunctionOverloadDemo.val(ShowClassButtonValue);
            txtStudentAdd1.val("");
            txtStudentAdd2.val("");
            $("#txtStudentsAdded").val("");
        }
    });

    function OnlyDigitsInString(InputString: string): boolean {
        var Counter: number = 0;

        while (Counter < InputString.length) {
            if ((InputString[Counter] < '0') ||
                (InputString[Counter] > '9')) {
                return (false);
            }
            Counter++;     
        }
        return (true);
    }

    $(document).on("click", ".ContentFrameForHTMLFiles #btnAddStudent", function() {
        var OnlyDigitsInString1: boolean;
        var OnlyDigitsInString2: boolean;

        if (txtStudentAdd1.val().length < 1) {
            alert("Første indtastningsfelt må ikke være tomt !!!");
        }
        else {
            if (txtStudentAdd2.val().length < 1) {
                alert("Andet indtastningsfelt må ikke være tomt !!!");
            }
            else {
                OnlyDigitsInString1 = OnlyDigitsInString(txtStudentAdd1.val());
                OnlyDigitsInString2 = OnlyDigitsInString(txtStudentAdd2.val());

                if (OnlyDigitsInString1 && OnlyDigitsInString2) {
                    $("#txtStudentsAdded").val(AddStudentStuff(parseInt(txtStudentAdd1.val()),
                        parseInt(txtStudentAdd2.val())));
                }
                else {
                    $("#txtStudentsAdded").val(AddStudentStuff(txtStudentAdd1.val(),
                        txtStudentAdd2.val()));
                }
            }
        }
    });
});