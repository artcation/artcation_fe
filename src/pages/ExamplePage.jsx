import BottomButton from "../components/bottomButton";
import './ExamplePage.css'

export default function ExamplePage() {
    return (
        <>
            <div className="example">
                <div>
                    <div>
                        모집중
                    </div>
                    <h1>공연 공고</h1>
                </div>
                <div>
                    검색어, 어쩌구 저쩌구...
                </div>
            </div>
            <div className="bottomBar">
                <BottomButton text='테스트' type='primary' />
                <BottomButton text='안녕하세요' type='cancel' />
            </div>
        </>
    )
}