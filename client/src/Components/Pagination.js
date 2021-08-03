import React from 'react'

import { Pagination as APagination  } from 'antd';
import './Pagination.css'

export default function Pagination({posts, postsPerPage, paginate}) {
    console.log("operazione", Math.ceil(posts.length / postsPerPage))
    return (
        <div id="div-pagination">
            <APagination showSizeChanger={false} className="pagination" onChange={paginate} defaultCurrent={1} total={posts.length} />
        </div>
    )
}
