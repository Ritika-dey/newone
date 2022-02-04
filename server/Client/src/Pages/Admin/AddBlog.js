import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CKEditor } from 'ckeditor4-react'
// import "./Discussion.css"
import { useHistory } from 'react-router-dom'

export default function Addblog() {
    const history = useHistory()
    const [blog_body, setblog_body] = useState("")
    const [cat, Setcat] = useState([])
    const [title, SetTitle] = useState("")
    const [category, setcategory] = useState("")
    const [subject, SetSubject] = useState("")
    const [name, SetName] = useState('')
    const [fileName, SetFileName] = useState("")
    const changedata = (e) => {
        setblog_body(e.editor.getData())
    }
    // file
    const onChangeFile = (e) => {
        SetFileName(e.target.files[0]);
    }
    // adddata
    const changeClick = (e) => {
        e.preventDefault();
        if (!name || !blog_body || !subject || !title) {
            window.alert("Please enter All feilds")
        } else {

            const formData = new FormData();
            formData.append("name", name);
            formData.append("body", blog_body);
            formData.append("subject", subject);
            formData.append("title", title);
            formData.append("articleImage", fileName);
            SetName("");
            SetSubject("");
            SetTitle("");
            setblog_body("");
            axios.post("/addblog", formData).then((res) =>
                // SetMessage(res.data),
                window.alert(res.data),
            )
                .catch((err) => {
                    window.alert(err)
                });
        }
    };

    // if user not logged in
    // add category
    const Add = () => {
        if (!category) {
            window.alert("Please Add Category Field Cannot Be Empty")
        }
        else {
            const articles = {
                category
            }
            setcategory();
            axios.post("/category", articles).then
                (
                    res =>
                        window.alert("Category Added"),

                )
                .catch(err => {
                    // wind("Category Allready Exists")
                    window.alert("Category Allready Exists")
                })
        }
    }
    // 
    // categories
    const getcat = async () => {

        const res = await fetch("/getcategory");
        const data = await res.json();

        // store the data into our Data variable
        Setcat(data);

    }
    useEffect(() => {
        getcat();

    })

    return (
        <div className="col-sm-12">
            <h3>Add New Subject From Here</h3>
            <input type="text" value={category} onChange={(e) => setcategory(e.target.value)} className="form-control"
                placeholder="Enter New Subject" /> <br />
            <input
                onClick={Add}
                value="Add "
                className="btn btn-primary" />
            <h3>Add Blog From here</h3>
            <form onSubmit={changeClick} encType="multipart/form-data" >
                <input type="text" value={name} onChange={(e) => SetName(e.target.value)} className="form-control"
                    placeholder="Enter your name here" /> <br />
                {/* <input type="text" name={subject} onChange={(e) => SetSubject(e.target.value)} className="form-control"
                                placeholder="Enter subject here" /> <br /> */}
                <select id="sel2" value={subject}
                    className="form-control"
                    onChange={(e) => SetSubject(e.target.value)} >
                    <option>Select Subject/Title</option>
                    {cat.map((i, index) => (
                        <option key={index}>{i.category}</option>

                    ))}
                </select><br />
                <textarea
                    rows="2" name={title} onChange={(e) => SetTitle(e.target.value)} className="form-control"
                    placeholder="Enter your blog title here" /> <br />
                {/* <textarea
                                rows="2" name={body} onChange={(e) => SetBody(e.target.value)} className="form-control"
                                placeholder="Enter your blog body here" /> <br /> */}
                <CKEditor
                    data={blog_body}
                    onChange={changedata}
                    initData={<h2>Enter blog body here...</h2>}
                /><br />

                <input type="file" filename="articleImage" onChange={onChangeFile} /><br />
                <input
                    type="submit"
                    value="Post Blog"
                    className="btn btn-primary" />

            </form>

        </div>
    )
}
