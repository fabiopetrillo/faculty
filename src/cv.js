import React from 'react';
import _ from "lodash";
import {Paper} from "./paper";

var cv = require('./cv.json');
var pubs = require('./pubs.json');

pubs = _.sortBy(pubs, 'year').reverse();

class Chunk extends React.Component {
		
	render() {
	
		var end = "";
		if(this.props.stop !== "none" && this.props.start !== this.props.stop)
			end = "-" + (this.props.stop === null ? "present" : this.props.stop);

		var three = this.props.three;
		if(three && _.isArray(three))
			three = _.map(three, (entry, index) => { return <small key={"note" + index}><br/>&ndash;{entry}</small>; });

		return (
			<div className="row">
				<div className="col-md-2 date">
					{this.props.start}{end}
				</div>
				<div className="col-md-10">
					<p>
						<strong>{this.props.header}</strong>
						{this.props.two ? <span><br/>{this.props.two} </span> : null}
						{three ? <span>{three}</span> : null}
						{this.props.four ? <small><br/>{this.props.four}</small> : null}
						{this.props.five ? <small><br/>{this.props.five}</small> : null}
					</p>
				</div>
			</div>
		);
	}
}

class Vita extends React.Component {
	
	getPapers(kind) {
		
		return _.map(_.filter(pubs, { kind: kind }), (paper, index) => {
			return <Paper {...paper} key={kind + index} hideLink={true} hideContribution={true} />
		});

	}
	
	getChunkList(list, prefix, start, stop, header, two, three, four, five) {
		
		return _.map(list, (entry, index) => {
			return this.getChunk(
				prefix + index, 
				entry[start],
				stop === null ? "none" : entry[stop],
				entry[header],
				entry[two],
				entry[three],
				entry[four],
				entry[five]
			);
		});
		
	}
	
	getChunk(key, start, stop, header, two, three, four, five) {
		
		return <Chunk key={key} start={start} stop={stop} header={header} two={two} three={three} four={four} five={five}/>;
		
	}
	
	getTable(list, prefix, start, stop, header, detail, secondDetail) {
		
		var rows = _.map(list, (entry, index) => {

			var end = "";
			if(stop !== null && entry[start] !== entry[stop])
				end = "-" + (entry[stop] === null ? "present" : entry[stop]);
			
			return <tr key={prefix+index}>
				<td><span className="date">{entry[start]}{end}</span></td>
				<td><strong>{entry[header]}</strong></td>
				{entry[detail] ? <td>{entry[detail]}</td> : undefined }
				{ entry[secondDetail] ? <td>{entry[secondDetail]}</td> : undefined }
			</tr>;
			
		});
			
		return <table className="table table-striped"><tbody>{rows}</tbody></table>;	
				
	}
	
	render() {
		
		return (
			<div className="cv">
			
				<h1>Andrew J. Ko, Ph.D.</h1>
				
				<p>
					Associate Professor, The Information School
					<br/>Adjunct Associate Professor, Paul G. Allen School of Computer Science & Engineering
					<br/>University of Washington, Seattle, USA
				</p>
				
				<h2>Interests</h2>
				
				<p>
					I research effective, equitable, scalable ways for humanity to harness the power of computing. This work spans human-computer interaction, software engineering, and computing education.
				</p>

				<h2>Education</h2>

				{this.getChunkList(cv.degrees, "degree", "year", null, "degree", "institution", "thesis", "committee")}
	
				<h2>Professional Experience</h2>
				
				{this.getChunkList(cv.jobs, "job", "startdate", "enddate", "title", "organization")}

				<h2>Honors and Awards</h2>
			
				<h3>Paper Awards</h3>

				{this.getChunkList(_.sortBy(_.filter(pubs, (pub) => { return pub.award && pub.award.length > 0 }), "year").reverse(), "paperAward", "year", null, "title", "award")}
			
				<h3>Awards and Recognitions</h3>

				{this.getTable(cv.awards, "award", "year", null, "title")}

				<h2>Funding</h2>

				{this.getChunkList(cv.funding, "funding", "startdate", "enddate", "title", "amount", "funder", "investigators", "description")}

				<h2>Publications</h2>
				
				<p><small>Unlike most of academia, premiere conferences in Human-Computer Interaction (HCI), Software Engineering (SE), and Computing Education are selective venues for archival research. These conferences exceed many journals in their selectivity, visibility, and impact.</small></p>
			
				<p><small>Authorship order indicates the scope of my intellectual contribution to the work. However, because I collaborate closely with my Ph.D. students on research, they are first author on many of my key publications.</small></p>

				<h3>Refereed Conference Papers</h3>

				{this.getPapers("refereed conference paper")}				

				<h3>Journal Articles</h3>
				
				{this.getPapers("journal article")}				
				
				<h3>Short Refereed Conference Papers</h3>
				
				{this.getPapers("refereed short conference paper")}				
			
				<h3>Refereed Workshop Papers</h3>
				
				{this.getPapers("refereed workshop paper")}				

				<h3>Juried Conference Papers</h3>
				
				{this.getPapers("juried conference paper")}				

				<h3>Book Chapters</h3>
				
				{this.getPapers("book chapter")}				

				<h3>Refereed Invited Articles</h3>
				
				{this.getPapers("refereed invited article")}				

				<h3>Non-Refereed Workshop Papers</h3>
				
				{this.getPapers("non-refereed workshop paper")}				

				<h3>Technical Reports</h3>
				
				{this.getPapers("technical report")}
				
				<h2>Press</h2>

				{this.getChunkList(cv.press, "press", "date", null, "title", "source", "author", "link")}
				
				<h2>Invited Keynotes</h2>

				{this.getChunkList(cv.keynotes, "keynote", "date", null, "title", "venue")}
				
				<h2>Invited Talks</h2>

				{this.getChunkList(cv.invitedtalks, "invited", "date", null, "title", "venue")}

				<h2>Patents</h2>
			
				{this.getChunkList(cv.patents, "patent", "year", null, "title", "number", "inventors")}

				<h2>Teaching</h2>
			
				<h3>Courses</h3>

				<p>All scores are <a href="http://www.washington.edu/assessment/course-evaluations/reports/course-reports/adjusted-medians/">adjusted combined medians</a>, which attempt to measure students' perceptions of the effectiveness of an instructor's teaching. The scale is from "Very Poor" (0) to "Excellent" (5).</p>

				{this.getTable(cv.courses, "course", "date", null, "title", "count", "score")}

				<h2>Doctoral Student Supervision</h2>
				
				<h3>Chair</h3>

				{this.getChunkList(cv.doctoralChair, "doctoralChair", "startdate", "enddate", "name", "department", "notes")}
				
				<h3>Committee Member</h3>

				{this.getTable(cv.doctoralCommittee, "doctoralCommittee", "startdate", "enddate", "name", "department")}
				
				<h2>Service</h2>

				<h3>Academic Program Chair</h3>
				
				{this.getChunkList(cv.academicChair, "academicChair", "dates", null, "program", "title", "notes")}

				<h3>Journal Editorial Boards</h3>
			
				{this.getChunkList(cv.editor, "editor", "dates", null, "venue", "title")}

				<h3>Conference Program Chair</h3>

				{this.getChunkList(cv.programChair, "programChair", "dates", null, "venue", "title")}

				<h3>Conference Program Committee Member</h3>

				{this.getTable(cv.programCommittee, "programCommittee", "dates", null, "venue", "role")}

				<h3>Reviewer</h3>

				{this.getTable(cv.reviewer, "review", "dates", null, "venue")}

				<h3>Other Service</h3>

				{this.getChunkList(cv.otherService, "service", "dates", null, "title", "committee")}

			</div>
		)
	}
}

export { Vita };