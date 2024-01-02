export const HelpCenter = () => {
    return (
        <>
        <div className="title-group mb-3">
                        <h1 className="h2 mb-0">How can we help?</h1>
                    </div>

                    <div className="row my-4">
                        <div className="col-lg-7 col-12">
                            <div className="custom-block bg-white">
                                <form className="custom-form search-form" action="#" method="post">
                                    <div className="row">
                                        <div className="col-lg-12 mb-2">
                                            <h6>Search for the topics</h6>
                                        </div>

                                        <div className="col-lg-8 col-md-8 col-12">
                                            <input className="form-control mb-lg-0 mb-md-0" name="search" type="text" placeholder="Search" aria-label="Search"/>
                                        </div>

                                        <div className="col-lg-4 col-md-4 col-12">
                                            <button type="submit" className="form-control">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="custom-block custom-block-faq">
                                <h5 className="mb-4">Frequently Asked Questions</h5>

                                <strong className="d-block mb-2">What is Mini Finance Template?</strong>

                                <p>Mini Finance Template includes total 6 HTML pages for your customizations. It is free of charge provided by Tooplate website.</p>
                                
                                <strong className="d-block mt-3 mb-2">What is Free HTML Template?</strong>

                                <p>Free HTML Template is a ready-made web page based on HTML CSS codes.</p>

                                <strong className="d-block mt-3 mb-2">What is the best code editor?</strong>

                                <p>Popular code editors are Dreamweaver, Notepad++, Visual Studio Code, Rapid CSS, Sublime Text and Atom to edit HTML CSS JS codes and put in your own web contents.</p>

                                 <strong className="d-block mt-3 mb-2">Are all templates free to download?</strong>

                                 <p>Yes, all CSS templates are 100% free to download and use for your websites. You can also use them for learning HTML, CSS, and JavaScripts.</p>
                            </div>
                        </div>

                        <div className="col-lg-5 col-12">
                            <div className="custom-block custom-block-contact">
                                <h6 className="mb-4">Still can't find what you looking for?</h6>

                                <p>
                                    <strong>Call us:</strong>
                                    <a href="tel: 305-240-9671" className="ms-2">
                                        (60) 
                                        305-240-9671
                                    </a>
                                </p>

                                <a href="#" className="btn custom-btn custom-btn-bg-white mt-3">
                                    Chat with us
                                </a>
                            </div>
                        </div>
                    </div></>
    )
}